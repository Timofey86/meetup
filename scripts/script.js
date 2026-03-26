const eventsStore = [
    {
        title: "INFJ Personality Type - Coffee Shop Meet & Greet",
        description: "Being an INFJ",
        date: new Date(2024, 2, 23, 15),
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w",
        type: "offline",
        attendees: 99,
        category: "Hobbies and Passions",
        distance: 50,
    },
    {
        title: "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
        description: "New York AI Users",
        date: new Date(2024, 2, 23, 11, 30),
        image: "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "offline",
        attendees: 43,
        category: "Technology",
        distance: 25,
    },
    {
        title: "Book 40+ Appointments Per Month Using AI and Automation",
        description: "New Jersey Business Network",
        date: new Date(2024, 2, 16, 14),
        image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        category: "Technology",
        distance: 10,
    },
    {
        title: "Dump writing group weekly meetup",
        description: "Dump writing group",
        date: new Date(2024, 2, 13, 11),
        image: "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        attendees: 77,
        category: "Business",
        distance: 100,
    },
    {
        title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
        description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
        date: new Date(2024, 2, 14, 11),
        image: "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        attendees: 140,
        category: "Social Activities",
        distance: 74,
    },
    {
        title: "All Nations - Manhattan Missions Church Bible Study",
        description: "Manhattan Bible Study Meetup Group",
        date: new Date(2024, 2, 14, 11),
        image: "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "offline",
        category: "Health and Wellbeing",
        distance: 15,
    },
];

document.querySelectorAll('.select-wrapper select').forEach(select => {
    const wrapper = select.closest('.select-wrapper');

    select.addEventListener('focus', () => {
        document.querySelectorAll('.select-wrapper.open').forEach(w => {
            if (w !== wrapper) {
                w.classList.remove('open');
            }
        });

        wrapper.classList.add('open');
    });

    select.addEventListener('blur', () => {
        wrapper.classList.remove('open');
    });

    select.addEventListener('change', () => {
        wrapper.classList.remove('open');
    });
});

document.addEventListener('click', (e) => {
    document.querySelectorAll('.select-wrapper.open').forEach(wrapper => {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    });
});

const eventsList = document.querySelector("#eventsList");
const dayFilter = document.querySelector("#dayFilter");
const typeFilter = document.querySelector("#typeFilter");
const distanceFilter = document.querySelector("#distanceFilter");
const categoryFilter = document.querySelector("#categoryFilter");

function renderEvents(events) {
    if (!events.length) {
        eventsList.innerHTML = `<p class="events-empty">No events found.</p>`;
        return;
    }

    eventsList.innerHTML = events.map((event) => {
        const isOnline = event.type === "online";
        const categoryText = isOnline
            ? event.category
            : `${event.category} (${event.distance} km)`;

        const attendeesText = event.attendees
            ? `<span>${event.attendees} attendees</span>`
            : "";

        return `
            <article class="event-item">
                <div class="event-item__image-wrap ${isOnline ? "online" : ""}">
                    <img class="event-item__image" src="${event.image}" alt="${event.title}">
                </div>

                <div class="event-item__content">
                    <p class="event-item__date">${formatEventDate(event.date)}</p>
                    <h3 class="event-item__title">${event.title}</h3>
                    <p class="event-item__category">${categoryText}</p>
                    
                    <div class="event-item__meta">
                        ${attendeesText}
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

function formatEventDate(date) {
    const months = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const dayName = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${dayName}, ${month} ${day} · ${hours}:${minutes} ${ampm} UTC`;
}

function getDayFilterValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function filterEvents() {
    const selectedDay = dayFilter.value;
    const selectedType = typeFilter.value;
    const selectedDistance = distanceFilter.value;
    const selectedCategory = categoryFilter.value;

    const filteredEvents = eventsStore.filter((event) => {
        const matchesDay =
            selectedDay === "all" ||
            getDayFilterValue(event.date) === selectedDay;

        const matchesType =
            selectedType === "all" ||
            event.type === selectedType;

        const matchesDistance =
            selectedDistance === "all" ||
            (event.type === "offline" && Number(event.distance) === Number(selectedDistance));

        const matchesCategory =
            selectedCategory === "all" ||
            event.category === selectedCategory;

        return matchesDay && matchesType && matchesDistance && matchesCategory;
    });

    renderEvents(filteredEvents);
}

dayFilter.addEventListener("change", filterEvents);
typeFilter.addEventListener("change", filterEvents);
distanceFilter.addEventListener("change", filterEvents);
categoryFilter.addEventListener("change", filterEvents);

renderEvents(eventsStore);
