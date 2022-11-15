## Inlämningsuppgift

Denna uppgift går ut på att med hjälp av javascript bygga ett antal features som sammantaget gör det möjligt för användare att hitta och boka rum/utmaningar på [Esc]-sidan. Uppgiften utförs i grupp.

# Uppgiften

Tre nya funktioner (som eventuellt kan brytas ned ytterligare) ska utvecklas på sidan.

- Ladda challenge-data från API
- Filtrera challenges
- Boka challenge

Dessutom ska samarbetet dokumenteras genom mötesanteckningar och genom att alla är delaktiga i att skriva och commita kod till ett gemensamt GitHub-repository.

## Moment: Ladda challenge-data från API

- Listan med alla challenges ska laddas från ett API. Exakt format specificeras den 10 nov, men data som finns för varje challenge är:
  - Titel
  - Beskrivning
  - Typ (online/on-site)
  - Minsta antal deltagare
  - Högsta antal deltagare
  - Rating (siffra 0-5)
  - URL till bild
  - Etiketter
- Data från API ska användas för att bygga upp “korten” för rummen i DOM
  - Dels på startsidan där de tre med högst rating ska visas
  - Dels på en ny sida där alla ska visas

## Moment: Filtrera challenges

- Den nya sidan med alla challenges ska ha en knapp med etiketten “Filter challenges”
- När användaren klickar “Filter challenges” ska en yta öppnas med inställningar som styr vilka challenges som ska visas

  - Två checkboxar för “online” respektive “on-site”
  - Två rating-widgets (5 stjärnor) där användaren kan ange lägsta och högsta antal stjärnor genom att klicka på någon av de fem stjärnorna i respektive widget
  - En lista på de etiketter som hittats i datan där användaren kan klicka på etiketter för att aktivera/deaktivera filter per etikett. Enbart challenges som har samtliga de aktiverade etiketterna ska visas.
  - Ett textfält där användaren kan skriva text fritt. Enbart de challenges vars titel eller beskrivning innehåller texten som användaren skrivit ska visas.

- Filtreringen ska ske i webbläsaren, d.v.s. inte genom att ladda ny data från API med andra parametrar, utan genom att i javascript avgöra vilka rum/utmaningar som ska visas
  - Om inga challenges matchas ska texten “No matching challenges” visas

## Moment: Boka challenge

- När användaren klickar på “Book room” ska en ruta öppnas över allt annat, rutans innehåll byts ut i tre steg

  - I första steget visas en input där användaren kan välja ett datum, samt en knapp för att gå vidare. När användaren går vidare ska ett anrop göras till API för att se vilka tider som finns lediga det angivna datumet
  - I andra steget visas inputs för namn och e-post, samt två rullgardinsmenyer. I den första ska användaren kunna välja de tider som fanns tillgängliga, och i den andra hur många deltagare som ska medverka. Alternativen ska motsvara den data som hämtats från API. Slutligen även en knapp för att gå vidare.
  - När användaren går vidare ska ett tackmeddelande visas, samt möjlighet att stänga ned rutan och återgå till listan över utmaningar

- Bokningen ska kunna öppnas både från startsidan och från den nya sidan, d.v.s. på båda de platser där rum finns.

## Material

- Wireframes (och viss specifikation av funktionalitet) på Whimsical: https://whimsical.com/esc-hacker-escape-rooms-F8mpWfqf6GYnJQs6cff1fL
- Specifikation av API (redovisas onsdag den 16 november)

# Inlämning

Uppgiften lämnas in genom att sidan publiceras på GitHub pages och länk till sidan och dess repository skickas in via ItsLearning. Följande ska lämnas in:

- Länk till den publika sidan (Github Pages)
- Länk till repot där källkoden finns
- Länk till en GitHub pull request som du skickat in med egna ändringar
- Länk till en GitHub pull request som du reviewat
- Mötesanteckningar från alla gruppmöten (kan checkas in på GitHub, eller lämnas in via ItsLearning)
