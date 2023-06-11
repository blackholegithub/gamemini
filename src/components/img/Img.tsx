
type urlProp = string;

interface ImgProps {
  url: urlProp;
}

const Img = ({ url }: ImgProps) => {
  return (
    <div className="w-40 h-40">
      <img src={url} alt="Logo" className="w-full h-auto rounded-lg object-cover shadow-lg border border-gray-300" />
    </div>
  );
};

export default Img;
