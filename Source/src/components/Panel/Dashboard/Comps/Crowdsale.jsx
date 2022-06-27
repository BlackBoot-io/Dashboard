import { useCurrentCrowdsaleSchedulesQuery } from "api/crowdsaleSchedule";
import { useTranslation } from "react-i18next"
const Crowdsale = () => {
const { t } = useTranslation();
const {isLoading,error,isError,data} = useCurrentCrowdsaleSchedulesQuery();
return <div id="crowdsale"></div>;
};
export default Crowdsale;