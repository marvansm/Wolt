import Heading from "@/components/common/Heading";

export default function GetStarted() {
  return (
    <section className="pb-[100px]">
      <div className="flex items-center justify-center flex-col max-w-[1280px] px-[48px] mx-auto my-[48px]">
        <Heading title={"Get started in 3 easy steps"} />
      </div>
      <div className="flex items-center justify-center">
        <ul className="flex items-center gap-[24px]">
          <li className="w-[380px] flex items-center justify-center flex-col gap-3">
            <div className="bg-[#009de0] w-[5rem] h-[5rem] min-w-[5rem] min-h-[5rem] rounded-full flex items-center justify-center font-bold font-fredoka text-[3rem] text-[#202125]">
              <h1>1</h1>
            </div>{" "}
            <h3 className="font-bold text-[2rem] text-white font-fredoka">
              Submit your application
            </h3>
          </li>
          <li className="w-[380px] flex items-center justify-center flex-col gap-3">
            <div className="bg-[#009de0] w-[5rem] h-[5rem] min-w-[5rem] min-h-[5rem] rounded-full flex items-center justify-center font-bold font-fredoka text-[3rem] text-[#202125]">
              <h1>2</h1>
            </div>
            <h3 className="font-bold text-[2rem] text-white font-fredoka">
              Get approved
            </h3>
          </li>
          <li className="w-[380px] flex items-center justify-center flex-col gap-3">
            <div className="bg-[#009de0] w-[5rem] h-[5rem] min-w-[5rem] min-h-[5rem] rounded-full flex items-center justify-center font-bold font-fredoka text-[3rem] text-[#202125]">
              <h1>3</h1>
            </div>
            <h3 className="font-bold text-[2rem] text-white font-fredoka">
              Deliver & earn!
            </h3>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center mt-[62px]">
        <button className="bg-[#009de0] rounded-[12px] hover:bg-[#008ac5] duration-300 cursor-pointer text-[#202125] h-[56px] px-[20px] py-[12px] font-medium font-poppins">
          Sign up now
        </button>
      </div>
    </section>
  );
}
