crafty-sidescroller-demo
========================

A short sidescroller demo using crafty.js done in the style of Super Mario Bros 3.  No fancy graphics/sound just yet,
just trying to implement speeding up like with the P Speed.

Postmortem analysis:

Crafty doesn't handle changing speeds well.  Attempts to remove speed through the following fail:

this.removeComponent('Twoway', false);
this.addComponent('Twoway');
this.twoway(this.RUNNING_SPEED, this.RUNNING_JUMP_SPEED);

In addition, jump seems to add up.

Live Demo at http://www.olingallet.com/websites/sidescroller/ for now