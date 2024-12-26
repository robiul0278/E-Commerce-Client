
const Accordion = () => {
    return (
<div className="font-[sans-serif] p-6 space-y-4 max-w-4xl mx-auto">
    <h2 className="text-3xl font-extrabold text-gray-800 mb-8">FAQS</h2>
    <div className="accordion rounded-lg hover:bg-blue-50 transition-all">
      <button type="button" className="toggle-button w-full text-base text-left py-5 px-6 text-gray-800 flex items-center">
        <span className="mr-4">Are there any special discounts or promotions available during the event.</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="arrow transition-all w-3 fill-current ml-auto shrink-0 -rotate-90"
          viewBox="0 0 24 24">
          <path 
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
           data-original="#000000"></path>
        </svg>
      </button>
      <div className="content px-6 invisible max-h-0 overflow-hidden transition-all duration-300">
        <p className="text-sm text-gray-600">auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in
          efficitur consequat. Fusce et
          tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in.</p>
      </div>
    </div>
    <div className="accordion rounded-lg bg-blue-50 transition-all">
      <button type="button"
        className="toggle-button w-full text-base font-semibold text-left py-5 px-6 text-gray-800 flex items-center">
        <span className="mr-4">What are the dates and locations for the product launch events?</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="arrow transition-all w-3 fill-current ml-auto shrink-0 -rotate-180"
          viewBox="0 0 24 24">
          <path 
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
             data-original="#000000"></path>
        </svg>
      </button>
      <div className="content pb-5 px-6 overflow-hidden transition-all duration-300">
        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu,
          at fermentum dui. Maecenas
          vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada. Sed semper, justo vitae
          consequat fermentum, felis diam posuere ante, sed fermentum quam justo in dui. Nulla facilisi. Nulla aliquam
          auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et
          tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in.
        </p>
      </div>
    </div>
    <div className="accordion rounded-lg hover:bg-blue-50 transition-all">
      <button type="button" className="toggle-button w-full text-base text-left py-5 px-6 text-gray-800 flex items-center">
        <span className="mr-4">Can I bring a guest with me to the product launch event?</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="arrow transition-all w-3 fill-current ml-auto shrink-0 -rotate-90"
          viewBox="0 0 24 24">
          <path 
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
             data-original="#000000"></path>
        </svg>
      </button>
      <div className="content px-6 invisible max-h-0 overflow-hidden transition-all duration-300">
        <p className="text-sm text-gray-600">auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in
          efficitur consequat. Fusce et
          tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in.</p>
      </div>
    </div>
    <div className="accordion rounded-lg hover:bg-blue-50 transition-all">
      <button type="button" className="toggle-button w-full text-base text-left py-5 px-6 text-gray-800 flex items-center">
        <span className="mr-4">How can I contact the event organizers?</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="arrow transition-all w-3 fill-current ml-auto shrink-0 -rotate-90"
          viewBox="0 0 24 24">
          <path
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
           data-original="#000000"></path>
        </svg>
      </button>
      <div className="content px-6 invisible max-h-0 overflow-hidden transition-all duration-300">
        <p className="text-sm text-gray-600">auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in
          efficitur consequat. Fusce et
          tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in.</p>
      </div>
    </div>
    <div className="accordion rounded-lg hover:bg-blue-50 transition-all">
      <button type="button" className="toggle-button w-full text-base text-left py-5 px-6 text-gray-800 flex items-center">
        <span className="mr-4">Is there parking available at the venue?</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="arrow transition-all w-3 fill-current ml-auto shrink-0 -rotate-90"
          viewBox="0 0 24 24">
          <path 
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
           data-original="#000000"></path>
        </svg>
      </button>
      <div className="content px-6 invisible max-h-0 overflow-hidden transition-all duration-300">
        <p className="text-sm text-gray-600">auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in
          efficitur consequat. Fusce et
          tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in.</p>
      </div>
    </div>
  </div>
    )
}

export default Accordion