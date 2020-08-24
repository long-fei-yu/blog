if (1 > 0) {
    import('./components/button').then(({default: button}) => {
        document.body.append(button());
    });
} else {
    import('./components/heading').then(({default: heading}) => {
        document.body.append(heading());
    });
}
