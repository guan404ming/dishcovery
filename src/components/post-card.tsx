"use client";

import { Card } from "@/components/ui/card";

import Image from "next/image";

type PostCard = {
    title: string;
    context: string;
    remaining: number;
    photo: string;
  };

export function PostCard({ title, context, remaining, photo }: PostCard) {
    return (
        <Card className="m-2 lg:m-4 p-2 lg:p-4">
            <div className="flex gap-x-4">
                <Image
                    src={`/${photo}`}
                    width={96}
                    height={96}
                    alt={title}
                />
                <div>
                    <div className="flex items-center gap-x-8">
                        <p className="text-lg lg:text-2xl font-bold">{title}</p>
                        <p className="text-md lg:text-lg text-green-500">剩餘: {remaining}</p>
                    </div>
                    <p className="text-md lg:text-lg font-normal text-muted-foreground pt-2 lg:pt-4">
                        {context.slice(0, 30)}...
                    </p>
                </div>
            </div>
        </Card>
    );
  }