import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { notFound } from 'next/navigation'

const CATEGORIES = {
  hardware: 'メカ',
  software: 'ソフト',
  electronics: '電気・電子'
}

const VALID_CATEGORIES = Object.keys(CATEGORIES)

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({
    categoryName: category,
  }))
}

interface CategoryPageProps {
  params: {
    categoryName: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categoryName } = params
  
  // Normalize the category name to lowercase for comparison
  const normalizedCategoryName = categoryName.toLowerCase()
  
  if (!VALID_CATEGORIES.some(category => category.toLowerCase() === normalizedCategoryName)) {
    notFound()
  }

  // Use the original category name from VALID_CATEGORIES to preserve exact casing
  const validCategory = VALID_CATEGORIES.find(
    category => category.toLowerCase() === normalizedCategoryName
  )!
  
  const categoryTitle = CATEGORIES[validCategory as keyof typeof CATEGORIES]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            {categoryTitle}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {categoryTitle}カテゴリーの記事一覧
          </p>
        </div>

        <Separator />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>サンプル記事 {i}</CardTitle>
                <CardDescription>2024年1月1日公開</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {categoryTitle}カテゴリーのサンプル記事です。
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}