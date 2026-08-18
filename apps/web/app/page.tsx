import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { Card, CardContent } from "@/components/ui/card";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div>
      <p className="">Home Sweet Home</p>
      <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, error impedit. Temporibus eveniet, quis atque nisi doloribus, obcaecati quasi nulla exercitationem eius deleniti quo odio modi cupiditate eos porro vero?</p>
    </div>
  );
}
