"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Star, MessageSquare, Send, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useIntlayer } from "react-intlayer";

interface ReviewSectionProps {
  restaurantId?: string;
  productId?: string;
}

export default function ReviewSection({ restaurantId, productId }: ReviewSectionProps) {
  const { store } = useIntlayer("store");
  if (!store) return null;
  const { user, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const type = restaurantId ? "restaurant" : "product";
  const targetId = restaurantId || productId;

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews", type, targetId],
    queryFn: () => api.getData(`/reviews/${type}/${targetId}`),
    enabled: !!targetId,
  });

  const mutation = useMutation({
    mutationFn: (newReview: any) => api.PostData("/reviews", newReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", type, targetId] });
      setComment("");
      setRating(5);
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
        [type === "restaurant" ? "restaurantId" : "productId"]: targetId,
        userId: user?.id || (user as any)?._id,
      });
    } catch (error: any) {
      console.error("Failed to submit review", error);
      alert(error?.response?.data?.message || (store.reviews.error as any));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-12 mt-16 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between border-b border-border/10 pb-6">
        <h2 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
          <MessageSquare className="text-[#009de0]" size={32} />
          {store.reviews.reviewsTitle as any} ({reviews?.length || 0})
        </h2>
        
        {reviews?.length > 0 && (
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-2xl shadow-sm border border-border/10">
            <Star className="text-yellow-400 fill-yellow-400" size={20} />
            <span className="font-black text-lg">
              {(reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviews.length).toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="bg-card rounded-[32px] p-8 border border-border/10 shadow-xl space-y-6">
          <div className="flex flex-col gap-4">
            <label className="text-lg font-bold text-foreground">{store.reviews.rateExperience as any}</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className="transition-transform active:scale-90 hover:scale-110"
                >
                  <Star
                    size={36}
                    className={`${
                      s <= rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/20"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-lg font-bold text-foreground">{store.reviews.yourReview as any}</label>
            <textarea
              placeholder={store.reviews.placeholder as any}
              className="w-full h-32 bg-muted/30 border border-border/10 rounded-2xl p-4 text-foreground font-medium outline-none focus:border-[#009de0]/50 transition-all resize-none placeholder:text-muted-foreground/30"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="w-full h-14 bg-[#009de0] hover:bg-[#00b0ff] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-xl shadow-[#009de0]/20 transition-all active:scale-95"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
            {store.reviews.postReview as any}
          </Button>
        </form>
      ) : (
        <div className="bg-card/50 rounded-[32px] p-10 border border-dashed border-border/20 text-center space-y-4">
          <p className="text-muted-foreground font-bold text-xl">
            {store.reviews.loginPrompt as any}
          </p>
          <Button 
             variant="outline"
             className="px-8 rounded-xl font-bold border-border/20 hover:bg-secondary transition-all"
             onClick={() => window.location.href = '/login'}
          >
            {store.reviews.login as any}
          </Button>
        </div>
      )}

      <div className="space-y-6">
        {reviews?.map((review: any) => (
          <div key={review.id} className="bg-card rounded-[32px] p-8 border border-border/10 shadow-lg group hover:bg-secondary/20 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#009de0]/10 rounded-2xl flex items-center justify-center text-[#009de0] font-black text-xl">
                  {review.user?.firstName?.[0]}{review.user?.lastName?.[0]}
                </div>
                <div>
                  <h4 className="font-black text-lg text-foreground tracking-tight">
                    {review.user?.firstName} {review.user?.lastName}
                  </h4>
                  <p className="text-muted-foreground text-xs font-medium">
                    {format(new Date(review.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/20"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-foreground/80 font-medium leading-relaxed italic">
              &quot;{review.comment}&quot;
            </p>
          </div>
        ))}

        {reviews?.length === 0 && (
          <div className="text-center py-20 bg-muted/20 rounded-[40px] border border-dashed border-border/10">
            <MessageSquare className="mx-auto text-muted-foreground/20 mb-4" size={48} />
            <p className="text-muted-foreground font-bold text-lg">{store.reviews.noReviewsYet as any}</p>
          </div>
        )}
      </div>
    </div>
  );
}
