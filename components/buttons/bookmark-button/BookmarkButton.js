import styled from "@emotion/styled";
import css from "@emotion/css";
import { useMutation } from "@apollo/client";
import { useAlert } from "react-alert";
import { TIMEOUT } from "@utils/constant";

import { useAppSelector, useAppDispatch } from "@/store/store";
import BookMarkIcon from "@/icons/BookMarkIcon";
import useEvent from "@/hooks/useEvent";

import { setFavoriteRecipes } from "@/store/features/recipes/recipes-slice";

import { USER_FAVORITE_RECIPE } from "@/graphql/suggestic-mutatons";

const BookMarkButtonBackground = styled.div`
  border-radius: 50%;
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--linear-gradient-main);

  ${({ favorite }) =>
    !favorite &&
    css`
      background: white;
    `};
`;

const StyledBookMarkIcon = styled(BookMarkIcon)`
  color: ${({ favorite }) => (favorite ? "white" : "var(--color-icon)")};
`;

const BookMarkButton = () => {
  const alert = useAlert();

  const dispatch = useAppDispatch();
  const [userFavoriteRecipe] = useMutation(USER_FAVORITE_RECIPE);

  const { selectedRecipe, favoriteRecipes } = useAppSelector(
    (state) => state.recipes
  );

  const favorite = (favoriteRecipes ?? []).some(
    (it) => it.id === selectedRecipe.id
  );

  const onClick = useEvent(async () => {
    await userFavoriteRecipe({
      variables: {
        recipeId: selectedRecipe.databaseId,
      },
    });

    const becameFavorite = !favorite;

    const newFavoriteRecipes = becameFavorite
      ? favoriteRecipes.concat(selectedRecipe)
      : favoriteRecipes.filter((it) => it.id !== selectedRecipe.id);

    dispatch(setFavoriteRecipes(newFavoriteRecipes));

    alert.success(
      becameFavorite
        ? "Successfully added recipe to your favorites."
        : "Successfully removed recipe from your favorites.",
      TIMEOUT
    );
  });

  return (
    <BookMarkButtonBackground onClick={onClick} favorite={favorite}>
      <StyledBookMarkIcon
        height="16px"
        width="11px"
        favorite={favorite}
        alt="Favorite Button"
      />
    </BookMarkButtonBackground>
  );
};

export default BookMarkButton;
