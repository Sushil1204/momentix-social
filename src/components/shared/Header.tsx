import { Link, useNavigate } from "react-router-dom";
import momentix_logo_transparent from "@/assets/momentix_logo_transparent.svg";
import { Bell } from "lucide-react";
import { useUserContext } from "@/context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  return (
    <section className="sticky top-0 z-50 md:hidden bg-slate-100 w-full">
      <div className="flex items-center justify-between py-4 px-5 ">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={momentix_logo_transparent}
            alt="logo"
            width={150}
            height={300}
          />
        </Link>
        <div className="flex items-center gap-4">
          <Bell />
          <Link to={`/profile/${user?.id}`} className="flex items-center">
            <img
              src={user?.imageUrl}
              alt="profileImage"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
