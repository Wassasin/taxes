import React from 'react';

import IncomeGraph from './income-graph';
import DeltaGraph from './delta-graph';
import PercentageGraph from './percentage-graph';
import PopulationGraph from './population-graph';

export default () => <div>
  <div className="section" id="intro">
    <div className="container">
      <h2>Belastingen?</h2>
      <p>
        Het Nederlandse belastingstelsel is niet eenvoudig.
        Wil je weten hoeveel geld je moet betalen, dan kan je het makkelijkste een proefberekening door de
        belastingdienst laten uitvoeren.
        Wil je het ècht weten, dan kun je per belastingonderwerp enkel de wettekst induiken.
        Dit werkt voor de meesten blijkbaar prima.
        Ik wil echter weten hoe de Belastingdienst precies rekent.
      </p>
      <p>
        Sinds 2017 werk ik 0.6FTE, en aan het einde van het jaar ben ik full-time gaan werken.
        Mijn <a
        href="https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/themaoverstijgend/rekenhulpen/toeslagen/wat_is_mijn_toetsingsinkomen">heffingsinkomen
        / toetsingsinkomen</a> is hierdoor ruimschoots de &euro; 22.000,- overstegen.
        Ga je met een enkele euro over deze inkomensgrens, dan vervalt het volledige bedrag à &euro; 2.500,- van de
        huurtoeslag.
        Er is dus een inkomensgebied waarin je netto minder overhoudt, ookal krijg je <i>bruto</i> meer binnen.
        Dit voelt oneerlijk.
        Maar hoe oneerlijk is het precies?
      </p>
    </div>
  </div>
  <div className="section">
    <div className="container">
      <h2>Belastingen en kortingen 2018</h2>

      <div id="income">
        <IncomeGraph/>
      </div>
    </div>

    <div className="container">
      <h2>Inkomenstoename</h2>
      <div id="delta">
        <DeltaGraph/>
      </div>
    </div>

    <div className="container">
      <h2>Procentueel</h2>
      <div id="percentage">
        <PercentageGraph/>
      </div>
    </div>

    <div className="container">
      <h2>Populatie</h2>
      <div id="population">
        <PopulationGraph />
      </div>
    </div>
  </div>
</div>
;
