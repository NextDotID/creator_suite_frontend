export default function CreatePage() {
  return (
    <div className="container">
      <div className="flex items-center justify-center">
        <div className="xl:w-10/12 w-full px-8">
          <div className="py-12 flex flex-wrap items-center justify-center">
            <div className="w-52 h-16 relative md:mt-0 mt-4">
              <img
                src="https://i.ibb.co/DwNs7zG/Steps.png"
                alt="step1"
                className="w-full h-full"
              />
              <div className="absolute w-full flex flex-col px-6 items-center justify-center inset-0 m-0">
                <p className="w-full text-sm font-medium leading-4 text-white">
                  Sign Up
                </p>
                <p className="w-full text-xs mt-1 leading-none text-white">
                  description of step 1
                </p>
              </div>
            </div>
            <div className="w-52 h-16 relative md:mt-0 mt-4">
              <img
                src="https://i.ibb.co/wNZ4nzy/Steps2.png"
                alt="step2"
                className="w-full h-full"
              />
              <div className="absolute w-full flex flex-col px-6 items-center justify-center inset-0 m-0">
                <p className="w-full text-sm font-medium leading-4 text-indigo-800">
                  About you
                </p>
                <p className="w-full text-xs mt-1 leading-none text-indigo-800">
                  Some info about you
                </p>
              </div>
            </div>
            <div className="w-52 h-16 relative md:mt-0 mt-4">
              <img
                src="https://i.ibb.co/c2k4Gbr/Steps3.png"
                alt="step3"
                className="w-full h-full"
              />
              <div className="absolute w-full flex flex-col px-6 items-center justify-center inset-0 m-0">
                <p className="w-full text-sm font-medium leading-4 text-gray-700">
                  Onboarding
                </p>
                <p className="w-full text-xs mt-1 leading-none text-gray-500">
                  Get accquainted
                </p>
              </div>
            </div>
            <div className="w-52 h-16 relative lg:mt-0 mt-4">
              <img
                src="https://i.ibb.co/XCdjrhm/Steps4.png"
                alt="step4"
                className="w-full h-full"
              />
              <div className="absolute w-full flex flex-col px-6 items-center justify-center inset-0 m-0">
                <p className="w-full text-sm font-medium leading-4 text-gray-700">
                  Getting Started
                </p>
                <p className="w-full text-xs mt-1 leading-none text-gray-500">
                  Resources to begin
                </p>
              </div>
            </div>
          </div>
          <div className="xl:px-24">
            <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
              <div className="w-80">
                <div className="flex items-center">
                  <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">
                    Personal Information
                  </h1>
                </div>
                <p className="mt-4 text-sm leading-5 text-gray-600">
                  Information about the section could go here and a brief
                  description of how this might be used.
                </p>
              </div>
              <div>
                <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                  <div className="md:w-64">
                    <label
                      className="text-sm leading-none text-gray-800"
                      id="firstName"
                    >
                      First name
                    </label>
                    <input
                      type="name"
                      tabIndex={0}
                      className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="firstName"
                      placeholder="John"
                    />
                  </div>
                  <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label
                      className="text-sm leading-none text-gray-800"
                      id="lastName"
                    >
                      Last name
                    </label>
                    <input
                      type="name"
                      tabIndex={0}
                      className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="lastName"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="md:flex items-center lg:ml-24 mt-8">
                  <div className="md:w-64">
                    <label
                      className="text-sm leading-none text-gray-800"
                      id="emailAddress"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      tabIndex={0}
                      className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="emailAddress"
                      placeholder="youremail@example.com"
                    />
                  </div>
                  <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label
                      className="text-sm leading-none text-gray-800"
                      id="phone"
                    >
                      Phone number
                    </label>
                    <input
                      type="name"
                      tabIndex={0}
                      className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="phone"
                      placeholder="123-1234567"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4">
              <div className="w-80">
                <div className="flex items-center">
                  <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">
                    Security
                  </h1>
                </div>
                <p className="mt-4 text-sm leading-5 text-gray-600">
                  Information about the section could go here and a brief
                  description of how this might be used.
                </p>
              </div>
              <div>
                <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                  <div className="md:w-64">
                    <label
                      className="text-sm leading-none text-gray-800"
                      id="password"
                    >
                      Password
                    </label>
                    <input
                      type="name"
                      tabIndex={0}
                      className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label
                      className="text-sm leading-none text-gray-800"
                      id="securityCode"
                    >
                      Security Code
                    </label>
                    <input
                      type="name"
                      tabIndex={0}
                      className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="securityCode"
                      placeholder="Enter your security code"
                    />
                  </div>
                </div>
                <div className="md:flex items-center lg:ml-24 mt-8">
                  <div className="md:w-64">
                    <label
                      className="text-sm leading-none text-gray-800"
                      id="recoverEmail"
                    >
                      Recovery Email address
                    </label>
                    <input
                      type="name"
                      tabIndex={0}
                      className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="recoveryEmail"
                      placeholder="Your recovery email"
                    />
                  </div>
                  <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label
                      className="text-sm leading-none text-gray-800"
                      id="altPhone"
                    >
                      Alternate phone number
                    </label>
                    <input
                      type="name"
                      tabIndex={0}
                      className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="altPhone"
                      placeholder="Your alternate phone number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
