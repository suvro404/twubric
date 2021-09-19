export default {
    methods: {
        getFormattedDate(value) {
            if (!value) return '';
            let a = new Date(value * 1000);
            let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            let year = a.getFullYear();
            let month = months[a.getMonth()];
            let date = a.getDate();
            return (month + ' ' + date + ", " + year);

        }
    }
}