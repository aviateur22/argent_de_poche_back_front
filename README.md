# ArgentDePoche
Front end de l'application permattant la gestion de l'argent de poche

## stack
- angular 21
- ngrx

## Lancement en local
ng serve

## Build MOE
````
  "scripts": {
   ....
    "moe_href": "ng build --configuration=moe --base-href=/argent-de-poche/",
    "moe": "ng build --configuration=moe",
    ...
    }
````
### Build en MOE avec le context argent-de-poche
npm run moe_href

### Build en MOE sans context
npm run moe

## Build MOE
ng build --configuration=moe

## Build PROD
ng build --configuration=production
