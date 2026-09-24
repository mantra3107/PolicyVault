import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { getPolicies } from "../services/api";
import "./Calendar.css";

function Calendar() {
    const navigate = useNavigate();

    const today = new Date();

    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentDate, setCurrentDate] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    );

    useEffect(() => {
        async function loadPolicies() {
            try {
                const data = await getPolicies();
                setPolicies(data);
            } catch (error) {
                console.error(
                    "Unable to load calendar policies:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadPolicies();
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = currentDate.toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric"
    });

    const firstDay = new Date(year, month, 1).getDay();

    const mondayOffset =
        firstDay === 0 ? 6 : firstDay - 1;

    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();

    const previousMonthDays = new Date(
        year,
        month,
        0
    ).getDate();

    const calendarDays = [];

    for (let i = mondayOffset - 1; i >= 0; i--) {
        calendarDays.push({
            day: previousMonthDays - i,
            currentMonth: false,
            date: new Date(
                year,
                month - 1,
                previousMonthDays - i
            )
        });
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push({
            day,
            currentMonth: true,
            date: new Date(year, month, day)
        });
    }

    let nextDay = 1;

    while (calendarDays.length < 42) {
        calendarDays.push({
            day: nextDay,
            currentMonth: false,
            date: new Date(
                year,
                month + 1,
                nextDay
            )
        });

        nextDay++;
    }

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const getEventsForDate = (date) => {
        const events = [];

        policies.forEach((policy) => {
            if (policy.nextPaymentDate) {
                const paymentDate = new Date(
                    policy.nextPaymentDate
                );

                if (isSameDay(paymentDate, date)) {
                    events.push({
                        type: "payment",
                        title: policy.policyName,
                        policyId: policy.id,
                        amount: policy.premiumAmount
                    });
                }
            }

            if (policy.maturityDate) {
                const maturityDate = new Date(
                    policy.maturityDate
                );

                if (isSameDay(maturityDate, date)) {
                    events.push({
                        type: "maturity",
                        title: `${policy.policyName} matures`,
                        policyId: policy.id
                    });
                }
            }
        });

        return events;
    };

    const goToPreviousMonth = () => {
        setCurrentDate(
            new Date(year, month - 1, 1)
        );
    };

    const goToNextMonth = () => {
        setCurrentDate(
            new Date(year, month + 1, 1)
        );
    };

    const goToToday = () => {
        setCurrentDate(
            new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            )
        );
    };

    const upcomingEvents = useMemo(() => {
        const events = [];

        policies.forEach((policy) => {
            if (policy.nextPaymentDate) {
                const paymentDate = new Date(
                    policy.nextPaymentDate
                );

                if (paymentDate >= today) {
                    events.push({
                        type: "payment",
                        date: paymentDate,
                        title: policy.policyName,
                        subtitle: "Premium payment",
                        amount: policy.premiumAmount,
                        policyId: policy.id
                    });
                }
            }

            if (policy.maturityDate) {
                const maturityDate = new Date(
                    policy.maturityDate
                );

                if (maturityDate >= today) {
                    events.push({
                        type: "maturity",
                        date: maturityDate,
                        title: policy.policyName,
                        subtitle: "Policy maturity",
                        policyId: policy.id
                    });
                }
            }
        });

        return events
            .sort((a, b) => a.date - b.date)
            .slice(0, 6);
    }, [policies]);

    const formatDate = (date) => {
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const formatCurrency = (amount) => {
        return `₹${Number(amount).toLocaleString("en-IN")}`;
    };

    if (loading) {
        return (
            <div className="pv-calendar-page">
                <section className="pv-calendar-header">
                    <div>
                        <div className="section-label">
                            Your schedule
                        </div>

                        <h1 className="page-heading">
                            Calendar
                        </h1>

                        <p className="pv-calendar-subtitle">
                            Keep your premium payments and policy milestones in view.
                        </p>
                    </div>

                    <button
                        className="pv-btn"
                        onClick={goToToday}
                    >
                        <i className="bi bi-calendar2-check"></i>
                        <span>Today</span>
                    </button>
                </section>

                <section className="pv-calendar-layout">
                    <div className="pv-calendar-card surface">
                        <div className="pv-calendar-empty">
                            <i className="bi bi-calendar3"></i>

                            <p>
                                Loading your calendar...
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="pv-calendar-page">

            <section className="pv-calendar-header">

                <div>
                    <div className="section-label">
                        Your schedule
                    </div>

                    <h1 className="page-heading">
                        Calendar
                    </h1>

                    <p className="pv-calendar-subtitle">
                        Keep your premium payments and policy milestones in view.
                    </p>
                </div>

                <button
                    className="pv-btn"
                    onClick={goToToday}
                >
                    <i className="bi bi-calendar2-check"></i>
                    <span>Today</span>
                </button>

            </section>

            <section className="pv-calendar-layout">

                <div className="pv-calendar-card surface">

                    <div className="pv-calendar-toolbar">

                        <div>
                            <h2>
                                {monthName}
                            </h2>
                        </div>

                        <div className="pv-calendar-navigation">

                            <button
                                type="button"
                                onClick={goToPreviousMonth}
                                aria-label="Previous month"
                            >
                                <i className="bi bi-chevron-left"></i>
                            </button>

                            <button
                                type="button"
                                onClick={goToNextMonth}
                                aria-label="Next month"
                            >
                                <i className="bi bi-chevron-right"></i>
                            </button>

                        </div>

                    </div>

                    <div className="pv-calendar-weekdays">

                        {[
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday"
                        ].map((day) => (
                            <div key={day}>
                                {day.slice(0, 3)}
                            </div>
                        ))}

                    </div>

                    <div className="pv-calendar-grid">

                        {calendarDays.map((calendarDay, index) => {

                            const events = getEventsForDate(
                                calendarDay.date
                            );

                            const isToday = isSameDay(
                                calendarDay.date,
                                today
                            );

                            return (
                                <div
                                    className={`pv-calendar-day ${
                                        !calendarDay.currentMonth
                                            ? "pv-calendar-day-muted"
                                            : ""
                                    } ${
                                        isToday
                                            ? "pv-calendar-day-today"
                                            : ""
                                    }`}
                                    key={`${calendarDay.date.toISOString()}-${index}`}
                                >

                                    <span className="pv-calendar-date">
                                        {calendarDay.day}
                                    </span>

                                    <div className="pv-calendar-events">

                                        {events.slice(0, 2).map(
                                            (event, eventIndex) => (

                                                <button
                                                    type="button"
                                                    key={`${event.policyId}-${event.type}-${eventIndex}`}
                                                    className={`pv-calendar-event ${
                                                        event.type === "payment"
                                                            ? "pv-calendar-event-payment"
                                                            : "pv-calendar-event-maturity"
                                                    }`}
                                                    onClick={() =>
                                                        navigate(
                                                            `/policies/${event.policyId}`
                                                        )
                                                    }
                                                >
                                                    <span>
                                                        {event.type === "payment"
                                                            ? "Payment"
                                                            : "Maturity"}
                                                    </span>
                                                </button>

                                            )
                                        )}

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                    <div className="pv-calendar-legend">

                        <div>
                            <span className="pv-legend-dot pv-legend-payment"></span>
                            Premium payment
                        </div>

                        <div>
                            <span className="pv-legend-dot pv-legend-maturity"></span>
                            Policy maturity
                        </div>

                        <div>
                            <span className="pv-legend-dot pv-legend-today"></span>
                            Today
                        </div>

                    </div>

                </div>

                <aside className="pv-calendar-events-panel surface">

                    <div className="pv-events-panel-header">

                        <div className="section-label">
                            Coming up
                        </div>

                        <h2>
                            Upcoming events
                        </h2>

                    </div>

                    <div className="pv-upcoming-events">

                        {upcomingEvents.length === 0 ? (

                            <div className="pv-calendar-empty">
                                <i className="bi bi-calendar-x"></i>

                                <p>
                                    No upcoming events.
                                </p>
                            </div>

                        ) : (

                            upcomingEvents.map((event, index) => (

                                <button
                                    type="button"
                                    className="pv-upcoming-event"
                                    key={`${event.policyId}-${event.type}-${index}`}
                                    onClick={() =>
                                        navigate(
                                            `/policies/${event.policyId}`
                                        )
                                    }
                                >

                                    <div className="pv-upcoming-event-icon">
                                        <i
                                            className={
                                                event.type === "payment"
                                                    ? "bi bi-cash-stack"
                                                    : "bi bi-flag"
                                            }
                                        ></i>
                                    </div>

                                    <div className="pv-upcoming-event-content">

                                        <strong>
                                            {event.title}
                                        </strong>

                                        <span>
                                            {event.subtitle}
                                        </span>

                                        <small>
                                            {formatDate(event.date)}

                                            {event.amount
                                                ? ` · ${formatCurrency(event.amount)}`
                                                : ""}
                                        </small>

                                    </div>

                                    <i className="bi bi-arrow-right"></i>

                                </button>

                            ))

                        )}

                    </div>

                </aside>

            </section>

        </div>
    );
}

export default Calendar;