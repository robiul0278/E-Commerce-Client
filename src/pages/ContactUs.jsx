import { Mail, Phone, MapPin, Globe, Clock } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <div className="grid grid-cols-3 gap-5">
          <div className="items-center gap-4 p-4 border rounded-lg shadow-sm">
            <Mail className="text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-600">support@ecommerce.com</p>
            </div>
          </div>
          <div className="items-center gap-4 p-4 border rounded-lg shadow-sm">
            <Phone className="text-green-500" />
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-600">+1 234 567 890</p>
            </div>
          </div>
          <div className="items-center gap-4 p-4 border rounded-lg shadow-sm">
            <MapPin className="text-red-500" />
            <div>
              <h3 className="text-lg font-semibold">Address</h3>
              <p className="text-gray-600">123 E-Commerce St, City, Country</p>
            </div>
          </div>
          <div className="items-center gap-4 p-4 border rounded-lg shadow-sm">
            <Globe className="text-purple-500" />
            <div>
              <h3 className="text-lg font-semibold">Website</h3>
              <p className="text-gray-600">www.ecommerce.com</p>
            </div>
          </div>
          <div className="items-center gap-4 p-4 border rounded-lg shadow-sm">
            <Clock className="text-orange-500" />
            <div>
              <h3 className="text-lg font-semibold">Business Hours</h3>
              <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;