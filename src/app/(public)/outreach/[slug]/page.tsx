import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AbstractArt from "@/components/AbstractArt";
import { outreachPosts, getOutreachPost } from "@/lib/data";

export function generateStaticParams() {
  return outreachPosts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getOutreachPost(slug);
  return { title: post ? post.title : "Outreach" };
}

export default async function OutreachPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getOutreachPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/outreach"
        className="font-mono-label text-xs uppercase text-ink-soft hover:text-coral"
      >
        ← Outreach &amp; Community
      </Link>

      <div className="mt-6">
        <span className="font-mono-label text-xs uppercase text-ink-soft">
          {post.type} —{" "}
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <h1 className="font-display text-4xl mt-3 leading-tight">
          {post.title}
        </h1>
      </div>

      <div className="mt-10 aspect-[16/9]">
        <AbstractArt seed={post.slug} palette={post.palette} className="w-full h-full" />
      </div>

      <div className="mt-10 space-y-5 text-ink-soft text-lg leading-relaxed">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
