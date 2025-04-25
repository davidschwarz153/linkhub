# ICQA Link Hub

Ein modernes Dashboard für ICQA-Links und Tools mit Standortauswahl und Admin-Funktionen.

## Funktionen

- **Standortauswahl**: Wähle deinen Standort aus, um die Links automatisch anzupassen
- **Link-Verwaltung**: Öffne alle Links gleichzeitig in neuen Tabs
- **Admin-Dashboard**: Verwalte Links, füge neue hinzu oder bearbeite bestehende
- **Responsives Design**: Optimiert für alle Geräte und Bildschirmgrößen

## Technologien

- React mit TypeScript
- Tailwind CSS für das Styling
- React Router für die Navigation
- LocalStorage für die Datenspeicherung

## Installation

1. Klone das Repository
2. Installiere die Abhängigkeiten:
   ```
   npm install
   ```
3. Starte die Entwicklungsumgebung:
   ```
   npm run dev
   ```
4. Öffne [http://localhost:5173](http://localhost:5173) in deinem Browser

## Admin-Zugang

Um auf das Admin-Dashboard zuzugreifen:

1. Klicke auf den leicht transparenten "Admin"-Button auf der Hauptseite
2. Gib das Passwort "admin123" ein
3. Verwalte deine Links im Admin-Dashboard

## Standortauswahl

- Wähle deinen Standort aus dem Dropdown-Menü
- Der ausgewählte Standort wird in allen URLs verwendet, die "FRA7" oder "fra7" enthalten
- Der Standort wird im LocalStorage gespeichert und beim nächsten Besuch automatisch geladen

## Link-Verwaltung

Im Admin-Dashboard kannst du:

- Neue Links hinzufügen (Name, URL und Kategorie)
- Bestehende Links bearbeiten oder löschen
- Alle Links gleichzeitig in neuen Tabs öffnen

## Lizenz

Intern - Alle Rechte vorbehalten
