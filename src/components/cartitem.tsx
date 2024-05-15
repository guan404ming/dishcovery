import ImageCardCart from "./supplier/image-card_cart";

export default function CartItem({
  id,
  name,
  quantity,
  price,
  image,
  isCounter,
}: {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  isCounter?: boolean;
}) {
  return (
    <ImageCardCart
      href={`/cart/${id}`}
      isCounter={isCounter}
      initAmount={quantity}
      image={image || ""}
      id={id}
    >
      <div className="flex justify-between">
        <h1 className="font-semibold">{name}</h1>
      </div>

      <div className="mt-1 w-full max-w-24 overflow-hidden text-ellipsis text-wrap text-xs text-muted-foreground">
        $ {price}
      </div>
    </ImageCardCart>
  );
}
