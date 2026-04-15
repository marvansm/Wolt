"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Star, X, Send, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { useIntlayer } from "react-intlayer";

interface ProductReviewModalProps {
  product: {
    id: string;
    _id?: string;
    name: string;
    image?: string;
  };
  onClose: () => void;
}

export default function ProductReviewModal({ product, onClose }: ProductReviewModalProps) {
  const { review: content } = useIntlayer("features");
  if (!content) return null;
  const { user, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productId = product.id || (product as any)._id;

  const mutation = useMutation({
    mutationFn: (newReview: any) => api.PostData("/reviews", newReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", "product", productId] });
      queryClient.invalidateQueries({ queryKey: ["product-ratings"] });
      onClose();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !isLoggedIn) return;

    setIsSubmitting(true);
    try {
      await mutation.mutateAsync({
        rating,
        comment,
        productId,
        userId: user?.id,
      });
    } catch (error: any) {
      console.error("Failed to submit review", error);
      alert(error?.response?.data?.message || (content.alertError as any));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-card w-full max-w-[500px] rounded-[32px] overflow-hidden border border-border/10 shadow-2xl animate-in fade-in zoom-in-95 transition-all duration-300">
        <div className="p-8 pb-0 flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-black text-foreground tracking-tight">{content.title as any}</h3>
            <p className="text-muted-foreground font-medium mt-1">{product.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors border border-border/30"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {!isLoggedIn ? (
            <div className="bg-yellow-400/10 border border-yellow-400/20 p-4 rounded-2xl text-center">
              <p className="text-yellow-500 font-bold mb-3">{content.loginPrompt as any}</p>
              <Button 
                onClick={() => window.location.href = '/login'}
                variant="outline"
                className="rounded-xl font-bold"
              >
                {content.login as any}
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                <label className="text-lg font-bold text-foreground">{content.howManyStars as any}</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="transition-transform active:scale-90 hover:scale-110"
                    >
                      <Star
                        size={40}
                        className={`${
                          s <= rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/20"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-lg font-bold text-foreground">{content.yourFeedback as any}</label>
                <textarea
                  placeholder={content.feedbackPlaceholder as any}
                  className="w-full h-32 bg-muted/30 border border-border/10 rounded-2xl p-4 text-foreground font-medium outline-none focus:border-[#009de0]/50 transition-all resize-none placeholder:text-muted-foreground/30 shadow-inner"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !comment.trim()}
                className="w-full h-16 bg-[#009de0] hover:bg-[#00b0ff] text-white rounded-2xl font-black text-[18px] flex items-center justify-center gap-2 shadow-xl shadow-[#009de0]/30 transition-all active:scale-95"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                {content.postReview as any}
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
