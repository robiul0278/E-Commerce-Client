import { BadgeCheck, Headset, Truck } from "lucide-react";

export default function Features() {
    const features = [
      {
        icon:     <Truck />,
        title: "FREE AND FAST DELIVERY",
        description: "Free delivery for all orders over $140",
      },
      {
        icon: <Headset />,
        title: "24/7 CUSTOMER SERVICE",
        description: "Friendly 24/7 customer support",
      },
      {
        icon:<BadgeCheck />,
        title: "MONEY BACK GUARANTEE",
        description: "We return money within 30 days",
      },
    ];
  
    return (
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 py-12">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-14 h-14 flex items-center justify-center bg-gray-300 rounded-full">
              <span className="text-2xl text-white bg-gray-900 p-2 rounded-full">{feature.icon}</span>
            </div>
            <h3 className="mt-4 font-bold text-lg">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    );
  }
  