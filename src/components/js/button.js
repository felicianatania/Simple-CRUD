export default {
    name: 'ButtonComponent',
    props: {
        text: String,
        disabled: Boolean,
        width: String,
        bgColor: String,
        txtColor: String,
        padding: String
    },
    data() {
        return {}
    },
    computed: {
        calculatedPadding(){
            const paddingString = this.padding || '10px'; // default padding
            return 'padding:' + paddingString + ';';
        },

        backgroundColor(){
            let bgColor = this.bgColor ? this.bgColor : '#0072FF'
            return "background: " + bgColor + ';';
        },

        textColor(){
            let textColor = this.txtColor ? this.txtColor : '#ffffff'
            return "color: " + textColor  + ';';
        }
    },
    methods: {
        onClick() {
            this.$emit("onClick");
        },
    },
}