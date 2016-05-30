# TODOS

## Goldberg-Tarjan:
- [x] Abh. von Browser werden Pfeilspitzen nicht angezeigt (nicht in FF, IE, Edge, aber unter Safari und Chrome) (2016-31-05) 6998c6ac171c33f3c535eea952d443ae641cad3d
- [x] s und t in gleicher Farbe hervorheben, rot vermeiden (2016-04-26)
- [x] Infos an Knoten zu Excess und Höhe weglassen, verwirrt in unseren Augen (2016-04-26)
  * stattdessen im rechten Teil koordinatensystem x:excess y:hoehe
- [x] In rechtem Teil: Kanten ohne Infos zu Kap/Fluss, dadurch wird es unserer Meinung übersichtlicher (2016-04-26)
  * dafür im linken teil
- [x] Nur aktiven Knoten hervorheben (statt aller mit Excess), idealerweise durch Färbung des gesamten Knoten (2016-04-26)
  * in Rot gefärbt
- [x] Bei Darstellung der Höhefunktion die ID-Achse weglassen, stattdessen evtl. Knoten nach Höhe abfallend sortieren (macht die Idee des Algorithmus klarer?) (2016-04-26)
  * man kann wählen zwischen Excess / id auf der x Achse. Höhe war sowieso schon auf der y Achse.
- [ ] Im rechten Teil: nicht alle Kanten e in g zeigen, sondern nur Kanten des Residual Netwerks g', welche den aktuellen (roten) Knoten verlassen. Diese gestrichelt rendern und mit ihren Residual Kapazitäten c'. Ausserdem bei einem push die residual Kante über die gepusht wurde fett rot hervorheben, und bei einem relabel die residual kante zum Knoten mit der niedrigsten Höhe grün hervorheben.


## SPPRC:
- [ ] Interaktivität: beim SPPRC noch eine hover-funktionalität einbauen, welche die labels/pfade in der 2. darstellungsebene mit dem graphen in der 1. ebene verknüpft (also dass dann alle kanten die zum pfad gehören gehilighted werden)
sicherstellen, dass man bei bis zu 20 Knoten auch noch in beiden Visualisierungsebenen etwas erkennen kann und sich nicht alle knoten dann überlappen
- [ ] Einfärbung aller Label gemäß Knoten finden wir verwirrend, evtl. weglassen?
- [ ] Rechter Teil: Zeitfenster weiter hochziehen, obere Label sind außerhalb
- [ ] Aktives Label nicht rot hervorheben (rot = falsch?)
- [ ] label an v ueberschrift in label anzeigen
- [ ] label beschriftung kuerzer, ggf entfernen mit hovering
- [ ] unprocessed in sortierter reihenfolge nach resident vertex abarbeiten bei extenden und dominance
- [ ] in labelView filtern nach resident vertex, andere label ausblenden innerhalb von extension und dominance step
- [ ] am anfang vom loop alle wieder anzeigen
- [ ] unprocessed label gelb
- [ ] processed gruen
- [ ] im graph nur rot, gelb und gruen macht keine sinn auf nodes
- [ ] hovering (links click auf knoten: rechts alle label im knoten enden / rechts click auf label: links den pfad hervoheben (rot oder fett))
- [ ] beim extenden zwischenlabel ausblenden
- [ ] zeitfenster und knoten zuordnen (umrahmung)
- [x] Hervorheben der Kante, entlang derer extended wird? (2016-05-03)
  * Kante e wird links fett dargestellt

## Beide:
- [x] Beschreibung beschreibt was gerade links passiert ist / ab initialize beschreibungen eins früher anzeigen (2016-05-25)
  * noch offen: BEGIN/START des Algorithmus taucht nicht im LOG auf