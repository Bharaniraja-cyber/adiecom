function Stepper({ activeStep }) {
    const steps = ["Delivery", "Verification", "Payment"];

    return (
        <div className="flex items-center justify-center w-full py-8 bg-white border-b">
            <div className="flex items-center space-x-4">
                {steps.map((step, index) => (
                    <div key={step} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold text-xs
                                ${activeStep > index ? "bg-black border-black text-white" : 
                                  activeStep === index ? "border-black text-black" : "border-gray-300 text-gray-300"}`}>
                                {activeStep > index ? "✓" : index + 1}
                            </div>
                            <span className={`text-[10px] uppercase font-bold mt-1 tracking-tighter
                                ${activeStep >= index ? "text-black" : "text-gray-400"}`}>
                                {step}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`w-16 h-[2px] mx-2 mb-4 ${activeStep > index ? "bg-black" : "bg-gray-200"}`}></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Stepper;