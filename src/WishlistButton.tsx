import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from './WishlistContext';
import { Product } from './CartContext';

export function WishlistButton({ product, className }: { product: Product, className?: string }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`absolute top-3 right-3 z-30 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-[#FF4500] hover:text-white transition-all scale-90 sm:scale-100 ${className || ''}`}
    >
      <Heart size={20} fill={inWishlist ? "currentColor" : "none"} className={inWishlist ? "text-[#FF4500]" : ""} />
    </button>
  );
}
