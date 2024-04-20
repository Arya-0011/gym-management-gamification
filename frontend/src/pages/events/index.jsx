import { NotificationsProvider } from "@mantine/notifications";
// Page components
import EventList from "./eventCard";
import ReactCard from "./ReactCard";
import Report from "./Report";
import AddEvent from "./AddEvent";

// SampleProvider
import { EventProvider } from "../../contexts/EventContext";

const Eventlist = () => {
	return (
		<EventProvider>
			<NotificationsProvider>
				<EventList />
			</NotificationsProvider>
		</EventProvider>
	);
};

const Events = () => {
	return (
		<EventProvider>
			<NotificationsProvider>
				<ReactCard />
			</NotificationsProvider>
		</EventProvider>
	);
};

const AddEvents = () => {
	return (
		<EventProvider>
			<NotificationsProvider>
				<AddEvent />
			</NotificationsProvider>
		</EventProvider>
	);
};

const EventReport = () => {
	return (
		<div>
			<h1 style={{ textAlign: "center" }}>Event Report</h1>
			<EventProvider>
				<Report />
			</EventProvider>
		</div>
	);
};

export { Events, Eventlist, EventReport, AddEvents };
