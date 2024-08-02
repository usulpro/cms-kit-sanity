import type { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'

import { BlogPost } from '@/components/here_reusable_components_lets_decide_the_folders_name/cms/pages/blog/BlogPost'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadBlogPost } from '@/sanity/loader/loadQuery'
const BlogPostPreview = dynamic(
  () => import('@/components/here_reusable_components_lets_decide_the_folders_name/cms/pages/blog/BlogPostPreview'),
)

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: project } = await loadBlogPost(params.slug)
  const ogImage = urlForOpenGraphImage(project?.coverImage)

  return {
    title: project?.title,
    description: project?.overview
      ? toPlainText(project.overview)
      : (await parent).description,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('project')
}

export default async function loadBlogPostSlugRoute({ params }: Props) {
  const initial = await loadBlogPost(params.slug)

  if (draftMode().isEnabled) {
    return <BlogPostPreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <BlogPost data={initial.data} />
}
