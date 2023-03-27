using { sap.ui.lcnc as my } from '../db/schema';

using sap.ui.lcnc from '../db/schema';

@path : 'serviceonline'
service MainOnlineService
{
    annotate BusinessUnits with @restrict :
    [
        { grant : [ 'READ' ], to : [ 'CapexRead' ] },
        { grant : [ '*' ], to : [ 'CapexWrite' ] }
    ];

    annotate Capex with @restrict :
    [
        { grant : [ 'READ' ], to : [ 'CapexRead' ] },
        { grant : [ '*' ], to : [ 'CapexWrite' ] }
    ];

    annotate CapexType with @restrict :
    [
        { grant : [ 'READ' ], to : [ 'CapexRead' ] },
        { grant : [ '*' ], to : [ 'CapexWrite' ] }
    ];

    @workflow.start.dataObject : 'capexStart'
    @workflow.start.definitionId : 'capexapprovals'
    entity Capex as
        projection on my.Capex;

    entity CapexType as
        projection on my.CapexType;

    entity BusinessUnits as
        projection on my.BusinessUnits;
}

service MyCapexAppFeb22Service
{
    entity TestEntity as
        projection on lcnc.TestEntity;
}
