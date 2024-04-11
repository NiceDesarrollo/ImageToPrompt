import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IIcon  {
  width: number;
  height?: number;
}



const Icon = (props: IIcon) => {

  const {width, height} = props;

  return (
    <>
      <div className="flex lg:flex-1">
        <Link href={"/"} className="-m-1.5 p-1.5">
          <span className="sr-only">Video summary logo</span>
          <Image
            src="/icon.svg"
            width={width}
            height={height}
            alt="Video summary logo"
            priority
          />
        </Link>
      </div>
    </>
  );
};

export default Icon;
