"use client";
import { PlusCircle } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PurchaseCard } from "./purchase-card";
import { PostCard } from "./post-card";
import { ItemCard } from "./item-card";
import  ReservationDialog  from "./reservation-dialog";

import { useState, useEffect } from 'react';

export default function InfoTab() {
  const mockPurchase = [
    { 
      id: 123,
      storeName: "Store A",
      price: 10.99,
      state: "餐點準備中",
      photo: "1.jpeg"
    },
    {
      id: 456,
      storeName: "Store B",
      price: 15.49,
      state: "餐點準備中",
      photo: "1.jpeg"
    },
    {
      id: 789,
      storeName: "Store C",
      price: 8.75,
      state: "餐點準備中",
      photo: "1.jpeg"
    }
  ];

  const mockPost = [
    {
      id: 123,
      title: "Post A",
      context: "如想要而且蛋也沒關：不就是為什麼就沒了是全補多，的我只是辦我是當然也就變成，自己摩應該是結果我加的我，泡阿嬤腦袋用的表現了，人那時的也要拍的。自回家了值得聖誕一邊就是，上可愛的，好吃是他的狀成有機好香，然沒已節目基本上但好像友好嗚嗚嗚，出哈哈，己的看到這樣個一個的意的兩先不要。的時候：麼可愛的朋也不然後一就是所，很多當然是回覆，治郎，實有什麼我也會，第二在哪裡天看到的推拍麼都沒。麼上一堆力需要不覺得，就是因了真，跟但現在心我他不好期待可以，望他說不天都民們在：邊有幫他的次，巧克的時候機無法願意。",
      remaining: 3,
      photo: "1.jpeg"
    },
    {
      id: 456,
      title: "Post B",
      context: "來就不能，但他吧我覺得，絕對是的覺，去找本來存理想完抱歉會有，的話有什穿急嚶嚶嚶，雪整個又要要是可病會⋯說這的身的非常？是什麼有一整旁會放能自，希啊晚上受生了但是什麼那記得，房子你的想說這，而不低一定後一：挑難除遇到在那邊，覺得的遺全沒有比較有也許。什麼事，也沒超是那麼：點錢包帶著地當，收直接想是幹你冷就是說，人目的身想不到，的不。雖然一樣很我還是，你就是他還但是暗來用心是自己，個偶爾感覺到可以理，很不我就符合方想雖然，只有，二演的什麼你就不要。其該超級也很怎麼好處沒有一：弟弟一件事多這為什麼，我大人的立機的特抱歉。過去我剛剛遇過⋯忙都一點放，買的說很會我們想河道上。下次在一起不要舒服的，都可無料我覺是我朋，之後就謝您。人真的險數巧真的超，久以前：得面就東西無法知到，就覺得介紹格的應該⋯超好笑最後一描述對的文，內之後來這吧而且他。內興了啊啊以我就，成功是希有那麼看我別人，的還電影沒事的知，己花有事⋯不到漸漸就不，享受就重的時候哪裡不要再。就是了要錯到的他們，雖然我⋯次是打自，重要的時候我家裡下面。問在的不然對他想什麼救命是想要，的遺書落想面常用把超好，德面試個一都被交流：的問題問題到底是這還是。",
      remaining: 1,
      photo: "1.jpeg"
    },
    {
      id: 789,
      title: "Post C",
      context: "回來不知道出下條，好像是聊是不會⋯大哥起來超這種裝天早，沒有人是這樣的同的時候，來容才有特別點什麼非在學校，時候好像不也沒有⋯誕什麼會設定要不要是先就好了，魔法這種樣都好看的己謝謝。沒有還在天啊我還，討厭意我真的痞客我還是，澤剛剛視中讀是我本沒，我媽都覺得不旅人，第天⋯面因為什麼。練是他們痛，會有想問，不嗚即可⋯演出我感還一直，喻文州旅行發現，跟似乎好看喔不知道。之前的殺不繪師雄了一哇喜歡，超沒什，嗚嗚嗚，的只能用結果這個，可惡也能，臨終前可以覺得沒。希望起來然啊。知道我到啦⋯是出手續費死了不蛋糕。幽遊白不是沒有當時，很許多的麼這麼了謝謝到很多我，神在還沒的輯想知道是他們⋯麼都不大在家，是開還說偷偷說，個人子其實肉寫著的。求什麼圍底是什了呢友一起能有，在而且我好像，一段時可能會，就要哭令人意下禮拜歡起不滿：是在就不有喜歡看⋯要要再了因為。東西也不知，模式在台北勞日文：有興⋯到底相有很多我出這享受認為，夏油澤的友一起，一堆也沒有到什麼是想說己的我真的。一堆認親卡，想哭普通地方久然很經在在，人也差不多好像，對面覺得這的聲我第就會⋯腳了一點開識等的是⋯嗚嗚嗚⋯是的小時不知，好可人但灣功然後是我回去，什麼時自己沒到了是都多少絕對，一天天才了什麼，聖伯納這樣不來好，但好好像有？",
      remaining: 5,
      photo: "1.jpeg"
    }
  ]

  const mockItem = [
    {
      id: 123,
      name: "Item A",
      description: "如想要而且蛋也沒關：不就是為什麼就沒了是全補多，的我只是辦我是當然也就變成，自己摩應該是結果我加的我，泡阿嬤腦袋用的表現了，人那時的也要拍的。自回家了值得聖誕一邊就是，上可愛的，好吃是他的狀成有機好香，然沒已節目基本上但好像友好嗚嗚嗚，出哈哈，己的看到這樣個一個的意的兩先不要。的時候：麼可愛的朋也不然後一就是所，很多當然是回覆，治郎，實有什麼我也會，第二在哪裡天看到的推拍麼都沒。麼上一堆力需要不覺得，就是因了真，跟但現在心我他不好期待可以，望他說不天都民們在：邊有幫他的次，巧克的時候機無法願意。",
      remaining: 3,
      price: 10,
      photo: "1.jpeg"
    },
    {
      id: 456,
      name: "Item B",
      description: "來就不能，但他吧我覺得，絕對是的覺，去找本來存理想完抱歉會有，的話有什穿急嚶嚶嚶，雪整個又要要是可病會⋯說這的身的非常？是什麼有一整旁會放能自，希啊晚上受生了但是什麼那記得，房子你的想說這，而不低一定後一：挑難除遇到在那邊，覺得的遺全沒有比較有也許。什麼事，也沒超是那麼：點錢包帶著地當，收直接想是幹你冷就是說，人目的身想不到，的不。雖然一樣很我還是，你就是他還但是暗來用心是自己，個偶爾感覺到可以理，很不我就符合方想雖然，只有，二演的什麼你就不要。其該超級也很怎麼好處沒有一：弟弟一件事多這為什麼，我大人的立機的特抱歉。過去我剛剛遇過⋯忙都一點放，買的說很會我們想河道上。下次在一起不要舒服的，都可無料我覺是我朋，之後就謝您。人真的險數巧真的超，久以前：得面就東西無法知到，就覺得介紹格的應該⋯超好笑最後一描述對的文，內之後來這吧而且他。內興了啊啊以我就，成功是希有那麼看我別人，的還電影沒事的知，己花有事⋯不到漸漸就不，享受就重的時候哪裡不要再。就是了要錯到的他們，雖然我⋯次是打自，重要的時候我家裡下面。問在的不然對他想什麼救命是想要，的遺書落想面常用把超好，德面試個一都被交流：的問題問題到底是這還是。",
      remaining: 1,
      price: 100,
      photo: "1.jpeg"
    },
    {
      id: 789,
      name: "Item C",
      description: "回來不知道出下條，好像是聊是不會⋯大哥起來超這種裝天早，沒有人是這樣的同的時候，來容才有特別點什麼非在學校，時候好像不也沒有⋯誕什麼會設定要不要是先就好了，魔法這種樣都好看的己謝謝。沒有還在天啊我還，討厭意我真的痞客我還是，澤剛剛視中讀是我本沒，我媽都覺得不旅人，第天⋯面因為什麼。練是他們痛，會有想問，不嗚即可⋯演出我感還一直，喻文州旅行發現，跟似乎好看喔不知道。之前的殺不繪師雄了一哇喜歡，超沒什，嗚嗚嗚，的只能用結果這個，可惡也能，臨終前可以覺得沒。希望起來然啊。知道我到啦⋯是出手續費死了不蛋糕。幽遊白不是沒有當時，很許多的麼這麼了謝謝到很多我，神在還沒的輯想知道是他們⋯麼都不大在家，是開還說偷偷說，個人子其實肉寫著的。求什麼圍底是什了呢友一起能有，在而且我好像，一段時可能會，就要哭令人意下禮拜歡起不滿：是在就不有喜歡看⋯要要再了因為。東西也不知，模式在台北勞日文：有興⋯到底相有很多我出這享受認為，夏油澤的友一起，一堆也沒有到什麼是想說己的我真的。一堆認親卡，想哭普通地方久然很經在在，人也差不多好像，對面覺得這的聲我第就會⋯腳了一點開識等的是⋯嗚嗚嗚⋯是的小時不知，好可人但灣功然後是我回去，什麼時自己沒到了是都多少絕對，一天天才了什麼，聖伯納這樣不來好，但好好像有？",
      remaining: 5,
      price: 129,
      photo: "1.jpeg"
    }
  ]
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = () => {
    setDialogOpen(true);
  };

  useEffect(() => {
    console.log(dialogOpen);
  }, [dialogOpen]);
  return (
    <Tabs defaultValue="purchase" className="w-full">
      <div className="flex w-full items-center justify-between">
        <TabsList>
          <TabsTrigger value="purchase" className="pl-0">
            Purchase
          </TabsTrigger>
          <TabsTrigger value="post" className="border-x">
            Post
          </TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
        </TabsList>

        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center justify-center"
        >
          <PlusCircle size={18} strokeWidth={1.5} />
        </Button>
      </div>

      <TabsContent value="purchase">
        {mockPurchase.map((purchase, index) => (
          <div key={index} onClick={handleCardClick}>
            <PurchaseCard {...purchase} />
          </div>
        ))}
        {dialogOpen && (
          <ReservationDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
          />
        )}
      </TabsContent>
      <TabsContent value="post">
        {mockPost.map((post, index) => (
          <Link href={`post/${post.id}`}><PostCard key={index} {...post} /></Link>
        ))}
      </TabsContent>
      <TabsContent value="store">
        {mockItem.map((item, index) => (
          <ItemCard key={index} {...item} />
        ))}
      </TabsContent>
    </Tabs>
  );
}
