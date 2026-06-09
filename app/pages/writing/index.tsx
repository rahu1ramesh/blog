import { useLoaderData } from "react-router";
import { getAllTags } from "~/server";
import Base from "~/templates/base";
import Section from "~/templates/section";

export function meta() {
  return [
    { title: "Writing | Rahul Ramesh" },
    { name: "description", content: "A journal of things encountered, explored and examined" },
  ];
}

export function loader() {
  return { tags: getAllTags() };
}

export default function Writing() {
  const { tags } = useLoaderData<typeof loader>();

  return (
    <Base
      body={
        <Section title="Writing" subtitle="A journal of things encountered, explored and examined." items={tags.map(tag => ({ title: tag, link: `/writing/${tag}` }))} />
      }
    />
  );
}
