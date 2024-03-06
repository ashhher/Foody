import { Link } from "react-router-dom";
import { Banknote, Clock, Dot } from "lucide-react";
import { AspectRatio } from ".";
import { Restaurant } from "@/types";

type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid md:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap items-center content-start">
            {restaurant.cuisines.map((item, index) => (
              <span className="flex items-center">
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot size={20} />}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-2 text-green-600">
              <Clock size={20} className="text-green-600" />
              <div className="flex-1">
                {restaurant.estimatedDeliveryTime} mins
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Banknote size={20} />
              <div className="flex-1">
                Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
