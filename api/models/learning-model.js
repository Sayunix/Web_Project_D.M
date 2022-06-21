/* A class representing a category of books. It holds all the books belonging to this category. */
const url = require("url");

class Technique {
    constructor(name, title, cover, smalldescription, description, text, source) {
        this.name = name;
        this.title = title;
        this.cover = cover;
        this.smalldescription = smalldescription;
        this.description = description;
        this.text = text;
        this.source = source;
    }
}

class TechniqueModel {
    static TECHNIQUE_ID = 1;

    constructor() {
        this.techniques = new Map();
    }

    addTechnique(technique) {
        technique.id = TechniqueModel.TECHNIQUE_ID++;
        this.techniques.set(technique, technique.id);
    }

    getTechniques() {
        return Array.from(this.techniques.keys());
    }

    getTechnique(id) {
        if (typeof id !== "number") {
            throw new Error(`Given id must be an number, but is a ${typeof id}`);
        }

        let technique = null;

        for (var i = 0; i < this.getTechniques().length; i++) {
            if (this.getTechniques()[i].id === id){
                technique = this.getTechniques()[i];
            }
        }

        return technique;
    }

    deleteTechnique(id) {
        this.techniques.delete(this.getTechnique(id));
    }
}

const model = new TechniqueModel();

const twominuteruleTechnique = new Technique("two-minute", "THE 2 MINUTE RULE","img/The-2-Minute-Rule.jpg","Work with full focus just for 2 minutes" ,"You start to work just for 2 minutes. After the 2 minutes you decide what to fo next. This Rule is a mental trick that forces you into action.",'Overcoming procrastination and laziness can be hard, but it doesn’t always have to be.<br><br>' +
    'A strategy that couldn’t be easier to use is the two-minute rule, which is designed to help you stop procrastinating and stick to good habits at the same time. The rule is simple: Starting a new habit should never take more than two minutes to do.<br><br>' +
    '(The name of this strategy was inspired by the author and productivity consultant David Allen. He has his own 2-minute rule for improving productivity, which states, “If it takes less than two minutes, then do it now.”)<br><br>' +
    'Generally, you’ll find that any habit can be scaled down into a two-minute version:<br><br>' +
    '• “Read before bed each night” becomes “read one page before bed each night.”<br>' +
    '• “Do 30 minutes of yoga” becomes “take out my yoga mat.”<br>' +
    '• “Study for class” becomes “open my notes.”<br>' +
    '• “Fold the laundry” becomes “fold one pair of socks.”<br>' +
    '• “Run three miles” becomes “tie my running shoes.”',"https://www.cnbc.com/2019/02/01/the-2-minute-rule-how-to-stop-procrastinating-and-start-new-habits.html");
model.addTechnique(twominuteruleTechnique);

const fiftytwoseventeenTechnique = new Technique("fiftytwo-seventeen", "52/17","img/fiftytwo-seventeen.jpg","Work for 52 min - Break for 17 min" ,"A group find out that the most productive way is to work for 52 minutes, then take breaks for 17 minutes.",
    "Have you ever worked so hard without a break that by the time you stand up you’re practically sprinting to the bathroom? Have you ever found yourself nodding off in front of your work, unable to focus? Well, guess what? Neither our bodies nor our brains are made to work without a break all day long.<br><br>" +
    "Taking a break, in fact, helps keep our memories intact. Scientists have long known that sleep helps solidify memory. Now it turns out that resting while awake–meaning taking a periodic break from work–plays a different but equal role in processing and ingraining information into the brain. Downtime, in essence, is a cognitive necessity not an indulgent treat. It replenishes attention and motivation, creativity and productivity.<br><br>" +
    "Scientists have even figured out the perfect formula for this break, down to the minute. It’s the 52/17 rule: 52 minutes on, 17 minutes off.","https://neurotrack.com/resources/take-a-break-the-52-17-rule");
model.addTechnique(fiftytwoseventeenTechnique);

const ninetyMinuteTechnique = new Technique("ninety-min", "90 MINUTE FOCUS BLOCK","img/ninety-minute.jpg","Similar to Pomodoro Technique" ,"The idea is to work in 90-minute blocks rather than 25 minute periods and make breaks for 20 minutes.",
    "The 90-minute focus block is similar to the Pomodoro technique except for the recommendation of working in long, 90-minute blocks rather than 25 minute periods.<br><br>" +
    "The concept lends itself to the book The Enchanted World of Sleep by Peretz Lavie and the idea of “ultradian rhythms“. These are phases similar to rapid eye movement (REM) sleep that is linked strongly to hormonal release. Our cognitive functions and energies are reported to be at their maximal during these periods.<br><br>" +
    "Occurring periodically throughout the day in 90-minute bursts of high-frequency brain activity, the idea is you “lock on” to this timing. Scheduling your productivity sessions alongside them, is the name of the game.","https://willpeachmd.com/study-techniques-like-the-pomodoro-method#3_90_Minute_Focus_Block");
model.addTechnique(ninetyMinuteTechnique);

const PomodoroTechnique = new Technique("pomodoro", "POMODORO","img/Pomodoro.jpg","Work for 25 min - Short Break for 5 min" ,"1. Set a timer for 25 minutes<br>2. Don't let you distract<br>3. Take a 5 min break<br>4. After four breaks do a 15 min break<br>5. Repeat!",
    "The Pomodoro Technique was developed in the late 1980s by then university student Francesco Cirillo. Cirillo was struggling to focus on his studies and complete assignments. Feeling overwhelmed, he asked himself to commit to just 10 minutes of focused study time. Encouraged by the challenge, he found a tomato (pomodoro in Italian) shaped kitchen timer, and the Pomodoro technique was born.<br><br>" +
    "Though Cirillo went on to write a 130-page book about the method,  its biggest strength is its simplicity:<br><br>" +
    "1)  Get a to-do list and a timer.<br>" +
    "2)  Set your timer for 25 minutes, and focus on a single task until the timer rings.<br>" +
    "3)  When your session ends, mark off one pomodoro and record what you completed.<br>" +
    "4)  Then enjoy a five-minute break.<br>" +
    "5)  After four pomodoros, take a longer, more restorative 15-30 minute break.<br><br>" +
    "The 25-minute work sprints are the core of the method, but a Pomodoro practice also includes three rules for getting the most out of each interval:<br><br>" +
    "1)  Break down complex projects. If a task requires more than four pomodoros, it needs to be divided into smaller, actionable steps. Sticking to this rule will help ensure you make clear progress on your projects.<br>" +
    "2)  Small tasks go together. Any tasks that will take less than one Pomodoro should be combined with other simple tasks. For example, \"write rent check,\" \"set vet appointment,\" and \"read Pomodoro article\" could go together in one session.<br>" +
    "3)  Once a pomodoro is set, it must ring. The pomodoro is an indivisible unit of time and can not be broken, especially not to check incoming emails, team chats, or text messages. Any ideas, tasks, or requests that come up should be taken note of to come back to later. A digital task manager like Todoist is a great place for these, but pen and paper will do too.<br><br>" +
    "In the event of an unavoidable disruption, take your five-minute break and start again. Cirillo recommends that you track interruptions (internal or external) as they occur and reflect on how to avoid them in your next session.<br><br>" +
    "The rule applies even if you do finish your given task before the timer goes off. Use the rest of your time for overlearning, or improving skills or scope of knowledge. For example, you could spend the extra time reading up on professional journals or researching networking opportunities.",
    "https://www.cnbc.com/2019/02/01/the-2-minute-rule-how-to-stop-procrastinating-and-start-new-habits.html");
model.addTechnique(PomodoroTechnique);

module.exports = model;
