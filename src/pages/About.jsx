
const About = () => {
  return (
    <div>
<section className="max-w-7xl mx-auto px-6 py-16">
  <div className="grid md:grid-cols-2 gap-8 items-center">
    <div>
      <img src="https://www.newagebd.com/files/records/news/202304/200373_184.jpg" alt="About Us" className="rounded-lg shadow-lg"/>
    </div>

    <div>
      <h2 className="text-3xl font-bold mb-4">Welcome to Our Mobile Shop</h2>
      <p className="mb-4">
        At our mobile shop, we are passionate about connecting people through technology. Since our inception, we have been committed to offering the latest mobile devices, accessories, and exceptional customer service.
      </p>
      <p className="mb-4">
        Whether youre looking for the newest smartphones, budget-friendly options, or expert repair services, our experienced team is here to help you every step of the way.
      </p>
      <p className="font-bold">Why Choose Us?</p>
      <ul className="list-disc pl-6 mt-2">
        <li>Wide range of mobile phones and accessories.</li>
        <li>Competitive prices and exclusive deals.</li>
        <li>Trusted repair services with fast turnaround times.</li>
        <li>Friendly, knowledgeable, and customer-focused team.</li>
      </ul>
    </div>
  </div>
</section>


<section className=" mb-10 text-black py-12 text-center">
  <h2 className="text-2xl font-bold mb-4">Experience the Best in Mobile Shopping</h2>
  <p className="mb-6">Visit us today or browse our latest collection online. We’re here to help you stay connected!</p>
  <a href="/products" className="bg-white text-teal-500 py-2 px-6 rounded-lg shadow hover:bg-gray-700 transition">
    Browse Our Products
  </a>
</section>

    </div>
  )
}

export default About