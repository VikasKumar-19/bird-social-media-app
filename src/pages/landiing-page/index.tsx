import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthWrapper";
import lpOne from "../../assets/lp-one.jpg";
import lpTwo from "../../assets/lp-two.jpg";
import lpThree from "../../assets/lp-three.jpg";
import lpFour from "../../assets/lp-four.jpg";

const LandingPage = () => {
  const {user} = useContext(AuthContext);
  
  return (
    <div className="h-[calc(100vh-3rem)] overflow-auto flex bg-gradient-to-r from-blue-500 to-purple-900">
      <div className="flex-1 py-24 px-10 text-white">
        <h1 className="text-5xl font-bold my-4">
          Lorem ipsum dolor sit amet, cons
        </h1>
        <p className="text-xl italic">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, ipsam.
          Repellat dignissimos sapiente, velit ipsam soluta neque mollitia
          voluptas cupiditate dolore amet tempore itaque temporibus delectus
          tenetur perferendis in eveniet?
        </p>
        {user ? (
          <div className="my-8">
            <h3 className="font-bold text-2xl">Subscribe to our newsletter</h3>
            <form className="flex gap-4 my-5">
              <input
                className="rounded outline-none px-4 text-black"
                placeholder="Enter email address"
              />
              <button
                className="bg-gradient-to-r from-red-600 to-indigo-800 rounded px-6 py-2"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="my-8">
            <Link className="text-orange-300 hover:underline font-semibold text-xl" to={"/register"}>Create an account</Link>
            <p>
              Already have an account? <Link className="text-orange-300 hover:underline font-semibold" to={"/login"}>Login</Link>
            </p>
          </div>
        )}
      </div>
      <div className="flex-1 gap-4 py-20 px-8 flex-wrap">
        <div className="flex items-start gap-8 justify-center">
          <img className="h-52 rounded-xl inline-block" src={lpOne} alt="lp-one" />
          <img className="h-60 rounded-xl inline-block" src={lpTwo} alt="lp-two" />
        </div>
        <div className="flex items-end gap-8 my-8 justify-center">
          <img
            className="rounded-xl h-60 inline-block"
            src={lpThree}
            alt="lp-three"
          />
          <img className="w-72 rounded-xl h-60 inline-block" src={lpFour} alt="lp-four" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
