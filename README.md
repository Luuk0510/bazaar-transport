# Bazaar Express Transport (BET) - Distributie Simulatie

## Overzicht

Dit project is een simulatie-app voor het transport- en distributieproces van Bazaar Express Transport. De app helpt inzicht te krijgen in de efficiëntie van het laden van pallets en pakketten in vrachtwagens en biedt voorspellende analyses van mogelijke problemen.

De app is ontwikkeld als onderdeel van een eindopdracht, waarbij gebruik wordt gemaakt van pure **vanilla JavaScript**, zonder externe frameworks, pakketten of modules.

## Functies

- **Vrachtwagen configuratie**: Gebruikers kunnen vrachtwagens aanmaken via een stap-voor-stap formulier met de volgende kenmerken:
  - Lengte en breedte (met een maximum)
  - Aankomstinterval (in seconden)
  - Type transport: Koud transport | Breekbaar transport | Algemeen transport | Pallets | Snelkoerier
- **Virtuele lopende band**: Pakketten worden gegenereerd in verschillende tetromino-vormen, geïnspireerd op het spel Tetris.
- **Echte tetromino plaatsing**: Pakketten behouden hun originele Tetris-vorm wanneer ze in vrachtwagens worden geplaatst, zonder herformattering naar vierkante blokken.
- **Meerdere lopende banden**: Gebruikers kunnen tijdens de simulatie meerdere lopende banden toevoegen.
- **Animaties**: Pakketten worden geanimeerd terwijl ze naar de vrachtwagens worden geladen.
- **Drag & Drop**: Handmatige plaatsing van pakketten in vrachtwagens door drag & drop.
- **Wisselen tussen laadhallen**: Er zijn twee beschikbare laadhallen en gebruikers kunnen ertussen schakelen zonder dat de pagina herlaadt.
- **Weerafhankelijke simulatie**: Bepaalde vrachtwagens rijden niet bij specifieke weersomstandigheden:
  - Breekbaar transport rijdt niet bij regen of sneeuw.
  - Koud transport rijdt niet boven de 35 graden.
  - Palletvrachtwagens rijden niet bij harde wind.
- **Weer API integratie**: De app maakt gebruik van een API om actuele weersinformatie op te halen. Een debug veld maakt het eenvoudig om locaties en daarmee weersomstandigheden te wisselen.
