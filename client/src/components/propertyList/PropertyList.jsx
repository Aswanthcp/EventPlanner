import React from "react";
import { Link } from "react-router-dom";

const PropertyList = () => {
  return (
    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
      <div className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[300px]">
        <img
          src="https://res.cloudinary.com/drk9fe53m/image/upload/v1685682842/photo-1616455579100-2ceaa4eb2d37_ry6osu.jpg"
          alt="AirMax Pro"
          className="z-0 h-full w-full rounded-md object-cover"
        />
        <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-left">
          <h1 className="text-lg font-semibold text-white">CAR Rentals</h1>
          <p className="mt-2 text-sm text-gray-300">
            Rent our stylish cars for your upcoming event. Experience elegance
            and luxury on wheels.
          </p>
        <Link to="/itemList">
            <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
              Shop Now &rarr;
            </button>
          </Link>
        </div>
      </div>
      <div className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[300px]">
        <img
          src="https://5.imimg.com/data5/FP/AS/PR/SELLER-9571587/wedding-event-management-500x500.jpg"
          alt="AirMax Pro"
          className="z-0 h-full w-full rounded-md object-cover"
        />
        <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-left">
          <h1 className="text-lg font-semibold text-white">
            Marriage Items Rentels
          </h1>
          <p className="mt-2 text-sm text-gray-300">
            Stunning collection of wedding items available for rent, perfect for
            your special event. Explore now!
          </p>
        <Link to="/itemList">
            <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
              Shop Now &rarr;
            </button>
          </Link>
        </div>
      </div>
      <div className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[300px]">
        <img
          src="https://4.imimg.com/data4/SN/LJ/MY-9116046/corporate-conference-event-management-500x500.jpg"
          alt="AirMax Pro"
          className="z-0 h-full w-full rounded-md object-cover"
        />
        <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-left">
          <h1 className="text-lg font-semibold text-white">
            Conference Hall Rendels
          </h1>
          <p className="mt-2 text-sm text-gray-300">
            Spacious conference halls and rental items for flawless event
            experiences, offering versatility, comfort, and professional
            ambiance.
          </p>
        <Link to="/itemList">
            <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
              Shop Now &rarr;
            </button>
          </Link>
        </div>
      </div>
      <div className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[300px]">
        <img
          src="https://res.cloudinary.com/drk9fe53m/image/upload/v1685552566/samples/people/jazz.jpg"
          alt="AirMax Pro"
          className="z-0 h-full w-full rounded-md object-cover"
        />
        <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-left">
          <h1 className="text-lg font-semibold text-white">
            Music Bands and Orcistra
          </h1>
          <p className="mt-2 text-sm text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            debitis?
          </p>
          <Link to="/itemList">
            <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
              Shop Now &rarr;
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
