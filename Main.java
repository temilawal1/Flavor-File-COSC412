public class Main {
    public static void main(String[] args) {
        str author = null;
        int recipeID = null;
        str userKey = null;
        str RecipeName = null;
        boolean WebPageOpen = true;

        while (WebPageOpen == True) {
            //if button NewRecipe pressed:
            NewRecipe();

            //if button Delete pressed:
            DeleteRecipe(RecipeName);

        }
    }
    public static void NewRecipe(str fieldA, str fieldB, strfieldC, int fieldD){
        str RecipeName = fieldA;
        str IngredientsList = fieldB;
        str neededTools = fieldC;
        int Rating = fieldD;
    }
    public static void ViewRecipe(str RecipeName){

    }
    public static void ViewRecipeInstructions(str RecipeName){

    }
    public static void ViewRecipeIngredients(str RecipeName){

    }
    public static void DeleteRecipe(str RecipeName){

    }
    public static void SearchRecipe(str Search){

    }
}