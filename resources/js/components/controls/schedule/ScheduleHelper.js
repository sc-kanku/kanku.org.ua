 const ScheduleHelper = {
    generateId: function() {
        return Math.round(Math.random() * 1000000);
    },

    parseGroups: function(htmlStr) {
        let parsedGroups = [];

        $($($.parseHTML(htmlStr)).find(".card")).each(function(i, cardNode) {
            var groupNameNode = $(cardNode).find(".card-header");
            var scheduleDaysNodes = $(cardNode).find(".schedule").find("p");
            var shedule = [];

            scheduleDaysNodes.each(function(i2, sheduleDayNode) {
                var text = $(sheduleDayNode).text();

                var day = text.substr(0, text.indexOf("."));
                var startIndex = text.indexOf(".") + ".".length;
                var startLength = text.indexOf("—") - startIndex;
                var start = text.substr(startIndex, startLength);
                var finishIndex = text.indexOf("—") + "—".length;
                var finishLength = text.length - finishIndex;
                var finish = text.substr(finishIndex, finishLength);

                var sheduleDay = {
                    day: $.trim(day),
                    start: $.trim(start),
                    finish: $.trim(finish),
                    id: ScheduleHelper.generateId()
                };

                shedule.push(sheduleDay);
            });

            parsedGroups.push({
                name: groupNameNode.text(),
                schedule: shedule,
                id: ScheduleHelper.generateId()
            })
        });

        return parsedGroups;
    },

    GROUP_TEMPLATE : function() {
        let group = {
            name: "Назва групи",
            schedule: [
                ScheduleHelper.newDayModel(), 
                ScheduleHelper.newDayModel(), 
                ScheduleHelper.newDayModel()
            ]
        }

        group.schedule[1].day = 'Ср';
        group.schedule[2].day = 'Пт';

        return group;
    },

    newGroupModel : function() {
        return { ...ScheduleHelper.GROUP_TEMPLATE(), id: ScheduleHelper.generateId() };
    },

    getIndex : function(groupArray, groupToFind) {
        return (groupArray
            .map((curr, index) => (curr.id === groupToFind.id ? index : 0))
            .reduce((prev, curr) => (prev + curr))
        )
    },

    DAY_TEMPLATE : {
        day: "Пн",
        start: "16:00",
        finish: "18:00"
    },

    newDayModel : function() {
        return { ...ScheduleHelper.DAY_TEMPLATE, id: ScheduleHelper.generateId() };
    },

    scheduleToString : function(groups) {
        let str = "<div class='card-deck'>";

        str += groups.map(group => ScheduleHelper.groupToString(group)).join('');

        str += "</div>";

        return str;
    },

    groupToString : function(group) {
        let str = "";

        str += 		"<div class='card card-outline-secondary mb-3' style='width: 15em; display: inline-block;'>";
        str += 			"<div class='card-header'>" + group.name + "</div>";
        str += 			"<div class='card-body text-primary'>";
        str += 				"<span class='card-text schedule'>" + ScheduleHelper.daysToString(group.schedule) + "</span>";
        str += 			"</div>";
        str += 		"</div>";

        return str;
    },

    daysToString : function(scheduleDay) {
        let str = "";

        for (let i = 0; i < scheduleDay.length; i++) {
            str += "<p>" + scheduleDay[i].day + ". " + scheduleDay[i].start + " — " + scheduleDay[i].finish + "</p>";
        }

        return str; 
    }
};

export default ScheduleHelper;
