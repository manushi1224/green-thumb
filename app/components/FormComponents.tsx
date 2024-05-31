import Image from "next/image";
import { FormEvent } from "react";

type Props = {
  generateAnswer: Function;
  imagePreview: string;
  setImagePreview: Function;
  setImageUpload: Function;
  prompt: string;
  setPrompt: Function;
};

const FormComponents = ({
  generateAnswer,
  imagePreview,
  setImagePreview,
  setImageUpload,
  prompt,
  setPrompt,
}: Props) => {
  return (
    <div className="">
      <form
        onSubmit={(e) => generateAnswer(e as FormEvent)}
        className=" flex md:gap-5 gap-2 m-4 bottom-0 fixed bg-white p-4 rounded-full md:max-w-[59%] md:w-[59%]"
      >
        {imagePreview && (
          <label htmlFor="file" className="cursor-pointer">
            <Image
              src={imagePreview}
              alt="profile"
              className="bg-cover rounded-full md:w-32 md:h-32 h-16 w-20"
              width={200}
              height={200}
            ></Image>
          </label>
        )}
        <div className="flex w-full items-center">
          <label
            htmlFor="file"
            className={`bg-transparent text-green-900 text-3xl mx-4 cursor-pointer ${
              imagePreview ? "hidden" : "block"
            }`}
          >
            +
          </label>
          <input
            type="file"
            name="file-upload"
            className="hidden"
            id="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => {
              if (e.target.files) {
                setImagePreview(URL?.createObjectURL(e.target.files[0]));
                setImageUpload(e.target.files[0]);
              }
            }}
          />
          <input
            placeholder="enter your prompt here..."
            className="p-2 rounded-full text-black w-full ring-transparent outline-none"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          ></input>
          <button
            disabled={!!!imagePreview && !!!prompt}
            className=" bg-gradient-to-r from-green-300 via-green-400 to-green-500 shadow-lg text-black rounded-full max-h-10 p-2"
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponents;
