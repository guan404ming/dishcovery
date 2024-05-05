"use client";

import { useState } from "react";

import { ChevronLeft } from "lucide-react";

import DialogMessage from "@/components/DialogMessage";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const post = {
  id: "1",
  banner:
    "https://img.delicious.com.au/aChNQyIi/w759-h506-cfill/del/2015/10/no-churn-ice-cream-four-ways-15139-2.jpg",
  title: "Get Some Pizza !!",
  user: "Prof. Chen",
  time: "20240502",
  place: "@NTU操場",
  image1:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHgAkAMBIgACEQEDEQH/xAAbAAADAAMBAQAAAAAAAAAAAAAEBQYAAgMHAf/EADoQAAIBAgUCBQIEAwgCAwAAAAECAwQRAAUSITEGQRMiUWFxgZEUIzKhQsHwBxUWM1Kx0eFDYqLi8f/EABkBAAIDAQAAAAAAAAAAAAAAAAMEAAECBf/EACsRAAICAQQBAgUEAwAAAAAAAAECAAMRBBIhMSITQQVRcYHwYZGhsRQVJP/aAAwDAQACEQMRAD8AlY1LAkdxbGyNpte99+/OOlMupATckDGRizeYC4xuVO9OFcaXvYc4LGlSqO1izBRq7seN+3/eCMsy6arpy8QjCeJ4Yu1mZvYd7X3xSDoGWppDoq4jMw80bodJ9r/9Yr6SjIaqqpYjIQSCJGQrp42G1sGXXwxLMC5RA66dz68DCzO8vzGkrp0nVlnjYCVZO5AsGv62tv3Fu/PfKJK2pcXVFRE0k3sL78ep7YUa10JMw2RHdGXnpfFNgSxAt33xtGG3vY2F+cfHzOkoylO7IfCPnCE2UC3JIGCEtJGHRdQYArtzhqt1PGeZAZ0giBIvvfsDjJaVXF1v5d9sdoleNrG4Ptgjna3GDSQGOj8+lTxzcWx2NBobVpJLADnbDSBVdbC3a4OCBHqIdtgvYe2JJEDQAILtYngH+vbC+ZYxq1kDSLtc7D5wZ1VnNNlaRx7PUTNZVBsFHqTiBq6qojrMwibTVJMv+dEps4PFr2tyPtgD27TtHccq0pZPUfhZSQFailaphDNDqsH0mxxq2q5BG+Ic11VRRKiSSAPsTc2Ow4H88UdHnaSU0K1CrE2lQhUHzDuW++MLcw4cQr6WuwE0H7RjdgPrjnY3wTLFLFIUlHm9Mc2FuL4ZBB5EQIKnBg8BsvIUe2HjdI18tLS1NLJA8VQuoMWI0m1wCLfuL4jppyRDGp80kipYbHnfHq+V1q01M1DUMNEBDx23umrSRf6/vgDvtmwIlyCkqenZFFZTrNN4YZdDGwubsVJA239Bi56ezZa/UfCMTxkBgT643z+jjny6/J1Axm9iCRv9OcTCPPlrsq1wplm5vYk29Bvv8b4GGYNNYBEJ/tKp71dPNTqDLLCVYjvY7f7nERl2RSN4hrZRoI8qoTe57+1vrilra2SulWSVmfQoQGTc+5wONZa9tvbBzWrYyIIxVL0xFVhTNUzO68NqAY/UC5w0y7KYcuh0wFjc3Ys5JP1OOGZ5vFl9LJMqa2QbkmyqTxc/fHKKnqRTrmHUNakNLsVSE7e3z9L/ADgNltVPI7h6dM9pjA5jRqdBlUspC+UXHsMfTVxAh01sr7r5G37emBqrPMkp6UmjqJI02UaovMbG1/8ArDPKuocgqoGiV3/EqrFQV5HI/a2Ez8QcngYjw+HYXJBM2pswp3TxC2gbbuLA39CcdqvM6eOkMsTK+kcqb3OIbp7qKOny/LqQxrIXe8xdTa1ybDcb8c/vinpK+LMZHNPSRz0rGyKCC2m/O4A+mLb4iazhxK/1pZdy9TzfMMxWtetlr4JHmbaB9RUw7+3O2NnzKlp8njanbTOfKUcXt2uCT/XoMegVmS0dTFJFAAj910WK39jiWn6Xp4fEjmjZWU7XHfm/vtgtW2zlWmr7htCunXWJMV9VTPDTkANJ/wCUyFQQe2n6HvfBFWkuY1VMaamSNBAEZl4Nu598dY1y6nzFaWJRHGG0zSMt7C/YYpKamgYiSlYvEG1K5UrqHx8742iKX2k5IktsuroFigBT+fzPlLA1PTJHc3H8TG4JxjEatPfBEinj0G9+2Bigv3J+MOAADAnJLFjkyXq11LdSRpIIth/051VDT0ktLmsFTVSnypLFp2X0NyO9/wBsJlj1EaQWv2wQscFNpLqNTcC1z/W+BsBjmEXJ4EuMzzufO44QEaGnRNKQ67ki1rt6mwG2OUEEUTKY0C33BUfqwtp4pVIRxIrhQQCCLbYbaClvMxVdhfgDGlxjImWBU4MKQXTt74AnE1ZWCgoh+a36nt/lr644ZlV/hIWJLAjgepw0ENV070m+ZwhTmMzDeQcE+nrbC+quNa4HZh9NV6jwXPJ8voKZ8giRampqLRzCQ2t357t6W4tjzyoetoKlcvq6mSSm0DwW1lgFHAHuMekU/wDZ3JmyDMc4qp1qpD4gVDZlPILN6/GMzXoapzKlNIrRmph88E2sK4Pa44IvjmIyrw3vG9USDis/WRWTzIJDFKZi3MEsaXdWPqLeZfaxxb9KVz1jvDU5RRNDT00kj1ApdJTSpI3vbkemJrJ8jzKrrny+SUUdbRzCGtVyRYW8rKeSDa4+mPTM3pKbIOhs0p6YMIxRshc9yw0/zxrb5YiVYsB4MQ9EZBQTZNTeNHHUySxpJq0A6Ta/cbcYc/4Pp1qWemkqKYMOI2GkNe5Njf8A4x86AjVulcsKHeWBNe58pA4GOnW/V8GQxLSwiKevl4hdiAqn+JiAbD+vcB9DeTmdA6qxT4mS3VM1Tkee0Yjk/E1EiFFhUknnkgeva/ocfDltTLQ6qptVSvlku1yDzv2vbDl+hQ8JqaiulmziU+LJVB/1bcKOAB6f7dvtPLJJBUQlw9VQj8wjcyx25t6gWxtG/wAdhshG/wCmvyPX5mQK9KRyVn4iW5DndNwObWOHCwwxyJAhESabm/CKO/xh5L4Rihmj1eDIl479vbfEJmOk10RrZPy6hBJdf4UubD9vpjrtaoTcvvOPYXHgx6lTHBEcvqZFkRwxCrYgsFAvvb1IH2GFUwC7nnHWjMcqa6ZdELLYHi9v+OPpjWdOfT3xqjO3JghIbMswenAjh8vqw5tjRZ5qidJKdCQNKm5uTcb7/TjBUlLE7h3W+/BOMj8eQOtBC0jqpYBd9IHOM2AZyY7Q742IMmUuSFYYBAXjeY/qCHZf/XDsVJvrJKkDi+IHpyurGbRCSPEBiJ0g6VJBbt/6jfFZNNaEuoDDkEG3/wCYqlzyuOBCausYFhOSe4FmFfPJmEGiimq44DraOFCTYHk2B2ue+DB11R1mdQDOJKiClppkeCmeOy3Ucnbm+OXRVUT1vTh2IUxstl/i3GHWivg6ozCJ2WoAqXYCRbrpJvYj0tb7YQ1liq2W/uM6CpnU7SMyzoussmrEvFWQvxfQ4Yj5Awn6vziWpq6GgyidVaR/zpFkUER29e1/vtidrs2yWaqIqOnKKC2y6YQAx7nVb/a31wEtH0/X5pGKqFoVEa3SnksRc9trm3N73wo1oY45xGa9FZX57ftmXnVPT81XT0+Z5HIP74ooPCAO/wCKjH8DepuLj6jCbMuoIc4/s7zEujJNH4ccsbco3iLscND0bl+WU4mg6lz6EkXjEdUH+wKnbEXmmX17RVuYFZJKercI8kjKhm0ebUwBtYaSSw2G/uQzjkTnpgkys6brKml6fy3KcqVDmH4WMs7i8dOrKCGY+tuF5PxgXMf7PaieZ2pM0AnqQDU1NRGHLPzcC4t8egwPQ1+ZZFBoTpPMPCbzFoX8W+1gdQv2/lhtl/XOrTFW5TmFEx8viVMVkJ+R/O2BjdnkS3UESxhjMNPDDIqMVjCllPoAMTtXUZRRZ9BKzJHVVd4pdRtYdr9vrgbM+r6SlV4pKevVAf1JRSlVPYh9NvscSma9Z5FWZjR1k0lSJKaQNramcAgeu3OB2h+MLDaYKCdxwJSPAWoJo3J/Ik232sTa33thFR5bOsDQVKII1kLRaQL6Lk2P1vgvK+pcrzetrYqLxJDIRJrZGA088G1rGwwVK4ACP6bkHHU0i7q8MOjENXjfn5xY8ehfJwBYffAE25tY/OGksi7gX2GAZmVlBJsOMPRWQlYXYEquFlP+LpvE8JyuoEE6rbHFRJTEQM5Av2F8cEgjCnYBiN9ucBdQw5jFNr1HchwYqyCathneOkcqzqUZx6HnFcqFadrtdgANje++F9HCkDqY0XnVcb7jDyIRVEWhVuUXSSODilqVSSJu7VWXKEboSeoKgZd1RSVDGwD2uPjFTn1fV0vWEpMg0TqJIyeHjYKPve/2xI53RvbVHdWG424I4w+ymSDqfJI2nnWOtoEItIbqyclT9tjhDXVA+REe+G3BGwZd9NZPRmKWOogEqWVlEi+Xfmwxx6w/uHL4kc0UUmaEWpUgTzE9hYcjCKl6oqKqRKHIlSzWi/Fsbwp8ep+DbfFrkeQ0mWl5XZp8wcfmVUu7sf5D2GEdPWBXhxzN6i1xaWB4nnUEmdZRLDL1MI9MsReOF5L6UFhv/ptqsbXtf5xdZ9TCLPOnXaVpI4zO9nPlBsihf/kbXxt1vRw1uRTO3hF6NWmZjyi6W7dwbWI7/TE+9XX1zZNlI8KWWWleXx35ESsum4Pqe/e2Nv4klRzKREasOOOeY4rc6g6XzWCCEouWSFQbMbUzNc6bdl2232uBbjGdLdUN1HmdYFMsUcTakAJHkvbf33xLU9LFJnOdZdmF56QIWkZ+SdIAt6c7fA9MDdKunRfUscdfM34Gti0Rz3GkFrMA3ptjR8lB9/lFqHVvUXGT7GexrUOxILjnbvbEl1eYv8R5VTWRTNdiwQFmPuf67+mOufRXlp6qmmETa7vOW0hI/wCKx+MKMjrP8R5pNn0lM0CwR+BTCU7BRuW+ff3tjLkshUw2lBVy5HAEZ5qUihjTwk8WW4LEDfT/AN4QVjBCbb229RgjMK38ZK0kBYoo0xH29frv+2FVfK8jIkamSWWwCDa3H9Xx2NMvp0jM5tx32HEHlndmVY7vKxsovvjesgqaKSOOqVSGTVdeDh9k+Tpl0bTyjVUMP1f6R6DEZ1z1bSQ1NDT0U0NcULmpeNgdN7AAEbX2/b3xldQXswvU0aQi5PcEEpbyBjfsSNr4FqNKEBf1HgjHyKpCI1tiRa5F9sYqpLYsQDcfOGYGb0LPLIsaKSSLr74oKaH8Ogul25LjfCGAiF0ZHcC2kC/HxhjTS3BOtuLHexxJULmpjUK4tYffEbmtNU5b4wjjLwTsPEQkgH7Y9BpGCU+6BgLgk+vvgesoY62Aoyi9r3tjLICJpWIMEyOvyPqmijy+SFcrzKFVjj8M6VZQbgW49d+d8V1Pmub5Q0dJVQxTgDTFLI+gsB2J9bW+/fHj+a5TPR1PiKXXSfI6mzLhzl/WFYtOaLqJJaulP/mUjWg9d++OTqdM45SdWjUKwCv1GNdm0s2fZtJNMVWeElgrA7qylFJ4Itf2scU2VVdJP1xSeFKoAyiOJBa2+pifrhPl/TuV11MK/KsxFVcEmIsUceoJB+m4wghrKqg6pljjpw1RSxLGquf0Eadj774CjZJ+YEOaVFexGzluP2nqC9N/iOp6ypkutKzRvKAf8wqtgvxcgn4wR/aFBlzdPvHV04mNS6oq307je9+xFr39sAZV1LX1GWmaejtUqvnWFXYegPH7YBgpZc8mebqGecQU4uULaE39v4bbe+53wNr6z4jv86g6NGa23Wde/wCsjcohzCsrIsollaGOVRJA0reR0BBuOxIGxAxeZlVDLqeHI6Al1EYFRKTvbm3yb3Pt84C6iqqPOKeny7KoF0U0ySLVKLCHT/o9b8XwBXv+AppJpHMj7szOdz7nHQ09G4h2HEDqtUSuxZ0klYkQwLqklPlQfbf2xQ5XlQoYzNUuGqSPM5P6fj2wk6BzGjzLL6rMbKtTE5WQtwi2uv05+2OuZZqa9TGr2plsGa1vE9/Ye2C2F7m2jgRVAta5PZgXUOa/3hEaWJ7Uo2kcbeL/APXHkWbNCcxn/DW8MNYWw96q6gFQ70dC35Q2klU/q9h7YlScMoioMCBZix5lda5Ab9LG1ycFQgWYEXt/ENscm0NYNpW+wPJxoHcNsSLc+4wSYxCUfw5G2vxzvhnSOgiI0h3J2Y8j1wsptLygG1yeD6XwwUiNdKiwJvfEkxHENUFQWIIIsVP9fH3x3inQIeBfgdhhNHLoHmuBwTvbHYS2I0jcd9sSTENraeKWNvEHexHridqMhkYhqdioPA9cPBJ4ieYsSDzgiNAum+6+/GKIB7kBI6kYcpqKaUs0TqSba4WKH4JwXRzZjQZtJmEdNLNMY9EhqLvq4sSfoMWUhX9NgeO3pjjoBYnUO9/tgL0IwIPUMt7r1F0PU/Vc9xH4ECueFjI7+pY/7YIWGvzDfN6x5ip2Q/p/4wUkGsr4Kku26hd/phzQ9PBwTX1Do5HlEVjo+b84H6VFXtNepbZE01ZR5VSmaaRIY4xzfn49/bEDnOf1XUlalHTnwaZ2NtR3YDe7e1u2Gec9L51U5zPFmtXE8cNvCMLeVlPGlf4fe+/7HEzmVNJkWZRGCTzr5lPPt/PDA/SBMscsyyHKsul0T6NagySMdiRxqHHr8Ym+oepZa6P8JTP+QBaSRRbxfp2GFuZZ3WZjEIZWVIRuUjFgx9T64W/GNYlTCfTBuV5bJmE2m5SJf1yW49h743yrLHrpAzXWAHzN6+wxUwxpTRLHEoVE4Ft8XKgMRJOgkg46MroATtva98ZjMSXCqH8pBqu7G5uRfDNYtVwR5rEAe/b6YzGYkk6+EAo1gqsh2A9e+MAF/KbD1xmMxJU+hipsDYH0OCYZHcAXvbGYzFyoRrWIG7XJHJ4wwpMunrGUn8uI8nufgY+4zCuosZF4h6UDHmOKX8DQ07ssqKkZKvKzbg+mE2Z53LUykZeHiS2lpXJuw9hwPnn4xmMwOisMSTCXOVGBJPPuo6bLAY4W8ap50X4Pqx/o4gK+umr6lp6hgXPYCwHsBjMZhwRWDYb5Xk7TATVQKQ9l4L/8DGYzEklBEVUBYwqogsANsaPIbnfgY+4zFyT/2Q==",
  image2:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8EBFM8hvxZZCu8gc0k7Cm-gDVokueuBa-41Hpqzz3fQ&s",
  image3: "https://letsplay.tw/wp-content/uploads/20190630221316_45.jpg",
  productName: "Pizza",
  remainAmount: 2,
  comment:
    "緊急通知，我們還有少量便當剩餘，現在下單立享折扣 ! 這些美味的便當是用新鮮食材製作的...",
};

export default function Post() {
  const [save, setSave] = useState(false);
  const [reserve, setReserve] = useState(false);
  return (
    <>
      <div className="w-full">
        <img
          src={post.banner}
          className="h-auto max-h-[150px] w-full rounded-2xl object-cover md:max-h-[250px] lg:max-h-[350px]"
        ></img>
      </div>

      <div className="flex items-center justify-center">
        <ChevronLeft className="absolute left-[20px] h-12 w-12 cursor-pointer p-2 hover:rounded-full hover:bg-gray-100/50" />
        <p className="text-lg font-bold md:text-2xl lg:text-4xl">
          {post.title}
        </p>
      </div>

      <div className="flex gap-4">
        <Avatar className="h-12 w-12 bg-slate-400 lg:h-14 lg:w-14">
          <AvatarFallback>W</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-slate-800 md:text-lg lg:text-xl">
            {post.user}
          </p>
          <span className="text-sm text-slate-400 md:text-base lg:text-lg">
            {post.time}
          </span>
          <span className="text-sm text-slate-400 md:text-base lg:text-lg">
            {" "}
          </span>
          <span className="text-sm text-slate-400 md:text-base lg:text-lg">
            {post.place}
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-[40%] items-stretch md:w-[40%]">
          <div className="w-full md:h-[230px] lg:h-[350px]">
            <img
              src={post.image1}
              className="h-full w-full rounded-xl object-cover md:rounded-2xl lg:rounded-3xl"
            ></img>
          </div>
        </div>
        <div className="hidden w-[20%] md:block">
          <div className="flex flex-col gap-4">
            <img
              src={post.image2}
              className="h-[108px] rounded-lg object-cover md:rounded-xl lg:h-[166px] lg:rounded-2xl"
            ></img>
            <img
              src={post.image3}
              className="h-[108px] rounded-lg object-cover  md:rounded-xl lg:h-[166px] lg:rounded-2xl"
            ></img>
          </div>
        </div>
        <div className="ml-2 hidden w-[30%] md:block">
          <p className="text-xl font-bold md:text-3xl lg:text-5xl">
            {post.productName}
          </p>
          <p className="text-sm font-medium text-slate-600 md:text-xl md:leading-10 lg:text-2xl lg:leading-loose">
            Remaining : {post.remainAmount}
          </p>
          <text className="md-leading-8 lg-leading-10 line-clamp-3 text-sm text-slate-600 md:text-xl lg:text-2xl">
            {post.comment}
          </text>
          <div className="mt-4 flex w-[60%] gap-4 md:w-[40%]">
            <Button
              variant="outline"
              className="h-8 bg-gray-300 text-lg font-bold md:h-12"
              onClick={() => setSave(true)}
            >
              Cart
            </Button>
            <Button
              variant="outline"
              className="h-8 bg-gray-300 text-lg font-bold md:h-12"
              onClick={() => setReserve(true)}
            >
              Reserve
            </Button>
          </div>

          <DialogMessage type={"Add to Cart"} open={save} setOpen={setSave} />
          <DialogMessage type={"Reserve"} open={reserve} setOpen={setReserve} />
        </div>

        <div className="w-[60%] md:hidden md:w-[40%]">
          <p className="text-xl font-bold md:text-3xl lg:text-5xl">
            {post.productName}
          </p>
          <p className="text-sm font-medium text-slate-600 md:text-xl md:leading-10 lg:text-2xl lg:leading-loose">
            Remaining : {post.remainAmount}
          </p>
          <text className="md-leading-8 lg-leading-10 line-clamp-3 text-sm text-slate-600 md:text-xl lg:text-2xl">
            {post.comment}
          </text>
        </div>
      </div>

      <div className="flex md:hidden">
        <div className="w-[40%] md:w-[60%]">
          <div className="mt-[-10px] flex gap-2 md:mt-0 md:gap-4">
            <img
              src={post.image2}
              className="w-[43%] rounded-lg md:rounded-xl lg:rounded-2xl"
            ></img>
            <img
              src={post.image3}
              className="w-[43%] rounded-lg md:rounded-xl lg:rounded-2xl"
            ></img>
          </div>
        </div>
        <div className="ml-4 flex w-[60%] gap-4 md:w-[40%]">
          <Button
            variant="outline"
            className="h-8 bg-gray-300 md:h-12"
            onClick={() => setSave(true)}
          >
            Cart
          </Button>
          <Button
            variant="outline"
            className="h-8 bg-gray-300 md:h-12"
            onClick={() => setReserve(true)}
          >
            Reserve
          </Button>
        </div>
        <DialogMessage type={"Add to Cart"} open={save} setOpen={setSave} />
        <DialogMessage type={"Reserve"} open={reserve} setOpen={setReserve} />
      </div>

      <div className="">
        <text className="md-leading-8 lg-leading-10 line-clamp-3 text-sm text-slate-600 md:text-xl lg:text-2xl">
          {post.comment}
        </text>
      </div>
    </>
  );
}
