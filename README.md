# backend-teszt-feladat-express

Backend teszt feladat ExpressJS-ben MongoDB-vel. Típus: monolith.

Minden routehoz be kell jelentkezni. A legtöbbhöz (tehát ahol nincs @me) admin jogosultság is kell, ezért hozzáadtam egy teszt felhasználót.

**Teszt felhasználó:** _(ADMIN jogosultsággal)_
email: johndoe@example.com
jelszó: secretpassword

_Készítette: nrichard27 (thenagyrichard@gmail.com) (https://nrichard.hu)_

_(Jobban szeretek Discordon kommunikálni mint emailben:_ `midnightmqs` _)_

## Használat

Production módban:

```
docker-compose up
```

VAGY

Development módban:

```
npm install
npm run dev
```

## Dokumentáció

**Dokumentáció production módban nincs generálva.**

Swagger UI: http://localhost:3000/docs
OpenAPI specifikáció: http://localhost:3000/docs.json
