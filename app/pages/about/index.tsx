import ArticleProps from '~/templates/article';
import Base from "~/templates/base";

export function meta() {
  return [
    { title: "About | Rahul Ramesh" },
  ];
}

export default function About() {
  return <Base body={
    <ArticleProps
      title={"Rahul Ramesh"}
      subtitle={"മലയാളി | Ecclesiastes 9:10"}
      content={`By day, I’m a developer at [Thoughtworks India](https://www.thoughtworks.com/en-in) contributing to the open-source HMIS, [Bahmni](https://www.bahmni.org/). By... any other time, I'm a serial hobbyist who loves figuring out how things work. 
        \n\nI read a bit, write occasionally, sketch and spend a lot of time with music and cinema. I occasionally try to learn a new language; only to abandon it the second the honeymoon phase ends.
        \n\nHere, you'll find the receipts of whatever rabbit hole I've fallen down, random things I've broken and fixed, and the occasional essay on life outside of code.
        \n\nIf you have any book, movie, or music recommendations feel free to hit me up on my social media handles below.`}
    />
  } />;
}
