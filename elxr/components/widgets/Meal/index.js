import React from "react";
import { mealCss } from "@/elxr/components/widgets/Meal/styles";
import Link from "next/link";

function Meal() {
  return (
    <div css={mealCss}>
      <Link href={"/my_dashboard/meal-plan"}>
        <a>
          <div
            style={{
              backgroundImage: `url('/img/recipes.jpg')`,
            }}
            className={"meal ratio ratio-16x9 bg-cover"}
          >
            <h4>your meal plan</h4>
          </div>
        </a>
      </Link>
      <Link href={"/my_dashboard/recipe"}>
        <a>
          <div
            style={{
              backgroundImage: `url('/img/eal.jpg')`,
            }}
            className={"recipes ratio ratio-16x9 bg-cover"}
          >
            <h4>recipes</h4>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default Meal;
