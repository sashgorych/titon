/*
Интерфейс:
----------
function boxInfo(text);
function boxAlert(text);
function boxConfirm(text, cb);
function boxContinue(text, cb);
function boxInput(text, cbContinue, cbCancel, options);
function boxManyButtons(text, buttons, options);

Примеры:
--------
boxInfo('Ваш запрос отправлен. Ожидайте ответа.');

boxAlert('При отправке запроса возникла ошибка.');

boxConfirm('Нажмите "Ок" для отправки формы', function() {
    console.log('посылаю форму');
});

boxContinue('Нажмите "Продолжить" для отправки формы.', function() {
    console.log('посылаю форму');
});

function boxInput('Введите сумму желаемой скидки и нажмите "Продолжить".',
    function() {
        console.log('нажали "Продолжить"');
    },
    function() {
        console.log('нажали "Отмена"');
    },
    {width: 400, height: 160}
);

boxManyButtons('Вы хотите использовать номер дисконтной карты, ввести код ваучера или оплатить полную сумму?',
{
    'Номер карты': function() {
        console.log('использовать номер дисконтной карты');
    },
    'Код ваучера': function() {
        console.log('ввести код ваучера');
    },
    'Оплатить': function() {
        console.log('оплатить полную сумму');
    },
    'Отмена': function() {
        console.log('закрыть окно, ничего не хочу');
    }
}, {width: 464, height: 208});

*/
function boxConfirm(text, cb) {
    if (!$("#app-dialog-confirm").length) {
        $('body').append('<div id="app-dialog-confirm"></div>');
    }
	text = '<div class="icon-container warning-icon-container"></div>'+'<p>'+text+'</p>';
    $("#app-dialog-confirm").html(text);
    $("#app-dialog-confirm").dialog({
		resizable: false,
		modal: true,
		title: 'Подтверждение',
		height: 160,
		width: 400,
		dialogClass: 'jobsMultiSelect dialog-confirm',
		buttons: {
			"Ок": function() {
				$(this).dialog('close');
				cb(this);
			},
			"Отмена": function() {$(this).dialog('close');}
		}
	});
}

function boxAlert(text) {
	if (!$("#app-dialog-confirm").length) {
		$('body').append('<div id="app-dialog-confirm"></div>');
	}
	text = '<div class="icon-container alert-icon-container"></div>' + '<p>' + text + '</p>';
	$("#app-dialog-confirm").html(text);
	$("#app-dialog-confirm").dialog({
		resizable: false,
		modal: true,
		title: 'Внимание',
		height: 160,
		width: 400,
		dialogClass: 'jobsMultiSelect dialog-confirm',
		buttons: {
			"Ок": function() {
				$(this).dialog('close');
			}
		}
	});
}

function boxContinue(text, cb) {
    if (!$("#app-dialog-confirm").length) {
        $('body').append('<div id="app-dialog-confirm"></div>');
    }
	text = '<div class="icon-container warning-icon-container"></div>'+'<p>'+text+'</p>';
    $("#app-dialog-confirm").html(text);
    $("#app-dialog-confirm").dialog({
		resizable: false,
		modal: true,
		title: 'Продолжить',
		height: 200,
		width: 400,
		dialogClass: 'jobsMultiSelect dialog-confirm',
		buttons: {
			"Продолжить": function() {
				$(this).dialog('close');
				cb(this);
			},
			"Отмена": function() {$(this).dialog('close');}
		}
	});
}

function boxInput(text, cbContinue, cbCancel, options) {
    var value = '';
    var defaults = {width: 400, height: 160};

    if (typeof options != 'undefined') {
        $.extend(defaults, options);
    }

    if (!$("#app-dialog-confirm").length) {
        $('body').append('<div id="app-dialog-confirm"></div>');
    }
    text = '<div class="icon-container warning-icon-container"></div>'+'<p>'+text+'</p>';
    text += '<input type="text" value="" maxlength="128" style="width:100%" />';
    $("#app-dialog-confirm").html(text);
    $("#app-dialog-confirm").dialog({
                resizable: false,
                modal: true,
                title: 'Ввести данные',
                height: defaults.height,
                width: defaults.width,
                dialogClass: 'jobsMultiSelect dialog-confirm',
                buttons: {
                        "Продолжить": function() {
                                $(this).dialog('close');
                                cbContinue($(this).children(':input').val());
                        },
                        "Отмена": function() {
                            $(this).dialog('close');
                            cbCancel(this);
                        }
                },
                open: function(event, ui) { $(this).children(':input').focus(); }
        });
}

function boxInfo(text) {
    if (!$("#app-dialog-confirm").length) {
        $('body').append('<div id="app-dialog-confirm"></div>');
    }
        text = '<div class="icon-container info-icon-container"></div>'+'<p>'+text+'</p>';
    $("#app-dialog-confirm").html(text);
    $("#app-dialog-confirm").dialog({
                resizable: false,
                modal: true,
                title: 'Сообщение',
                height: 160,
                width: 400,
                dialogClass: 'jobsMultiSelect dialog-confirm',
                buttons: {
                        "Ок": function() {
                                $(this).dialog('close');
                        }
                }
        });
}

function boxManyButtons(text, buttons, options) {
    var b = {};
    var defaults = {width: 400, height: 160};

    if (typeof options != 'undefined') {
        $.extend(defaults, options);
    }

    if (!$("#app-dialog-confirm").length) {
        $('body').append('<div id="app-dialog-confirm"></div>');
    }
    text = '<div class="icon-container info-icon-container"></div>'+'<p>'+text+'</p>';

    $.each(buttons, function(name, cb) {
        if (name && cb) b[name] = function() {
            $("#app-dialog-confirm").dialog('close');
            cb();
        };
    });

    $("#app-dialog-confirm").html(text);
    $("#app-dialog-confirm").dialog({
                resizable: false,
                modal: true,
                title: 'Выберите',
                height: defaults.height,
                width: defaults.width,
                dialogClass: 'jobsMultiSelect dialog-confirm',
                buttons: b
    });
}

