/*
	@ver 1.2
*/

function varidateModel( varidateItem ){

	dftCommon = {
		type         : 'input',
		selecter     : '',
		required     : true,
		number       : false,
		telpost      : false,
		alphanumeric : false,
		mail         : false,
		check        : false,
		en_one_char  : false,
		num_one_char : false,
		credit       : false,
		kana         : false,
		alphaupper   : false
	};

	dftOptions = {
		required  : '',
		maxlength : '',
		minlength : 0
	};

	this.Common  = $.extend( dftCommon , varidateItem.common );
	this.Options = $.extend( dftOptions , varidateItem.options );

	dftMessages = {
		// type はここから個別のものに変わってます 開始。
		select       : '選択必須項目です。',
		radio        : '選択必須項目です。',
		// type はここから個別のものに変わってます 終了。
		required     : '必須項目です。',
		maxlength    : this.Options.maxlength + '文字以下にしてください',
		minlength    : this.Options.minlength + '文字以上入力してください',
		number       : '半角数字で入力してください',
		telpost      : '半角数字で入力してください',
		mail         : 'メールアドレスの形式で入力してください',
		alphanumeric : '全て半角英数字で入力してください',
		check        : '入力された値が一致しません',
		en_one_char  : '英字を1文字以上含めてください',
		num_one_char : '数字を1文字以上含めてください',
		credit       : '不正なカード番号です',
		kana         : '全角カタカナで入力してください',
		alphaupper   : '全て大文字アルファベットで入力してください'
  };

  	this.Messages   = $.extend( dftMessages , varidateItem.messages );

}

// disabledだった場合
varidateModel.prototype.disabled_check = function() {
	if ( $(this.Common.selecter).is(':disabled') === true ) return 'disabled';
	return true;
};

// セレクトボックスか
varidateModel.prototype.select = function( value ){
	if( !value || value === "" ) return this.Messages.select;
	return true;
};

// ラジオボタンか
varidateModel.prototype.radio = function( value ){
	if( !value || value === "" )  return this.Messages.select;
	return true;
};

// 必須項目か
 varidateModel.prototype.required = function( value ){
	if( value && value !== this.Options.required  ) return true;
	return this.Messages.required;
};

// カタカナのみか。
varidateModel.prototype.kana = function( value ){
	if( value  &&  value.match(/^[ァ-ン]+$/)  ) return true;
	return this.Messages.kana;
};

// 数字のみか。
varidateModel.prototype.number = function( value ){
	if( value &&  value.match(/^\d+$/) ) return true;
	return this.Messages.number;
};

// 電話番号と郵便番号の時に使う。-(ハイフン)が記入されていたら削除するよ。
// テストでは、ハイフンが消えているかどうかは確認できないよ。

varidateModel.prototype.telpost = function( value ){
	if( value && value.match(/^\d+$/) ) return true;
	return this.Messages.telpost;
};

// 最大記入文字数
varidateModel.prototype.maxlength = function( value ){
	if( value && this.Options.maxlength >= value.length ) return true;
	return this.Messages.maxlength;
};

// 最小記入文字数
varidateModel.prototype.minlength = function( value ){
	if( value && this.Options.minlength <= value.length ) return true;
	return this.Messages.minlength;
};

// メールアドレスとして正しいか。
varidateModel.prototype.mail = function( value ){
	if( value && value.match(/^[A-Za-z0-9]+[\w\.\+-]+@[\w\.-]+\.\w{2,}$/) ) return true;
	return this.Messages.mail;
};

// 英数字のみか。
varidateModel.prototype.alphanumeric = function( value ){
	if( value &&  value.match(/^[a-zA-Z0-9]+$/) ) return true;
	return this.Messages.alphanumeric;
};

// 大文字の英字のみか。
varidateModel.prototype.alphaupper = function( value ){
	if( value &&  value.match(/^[A-Z]+$/) ) return true;
	return this.Messages.alphaupper;
};

// 英字が1文字以上記入されているか。
varidateModel.prototype.en_one_char = function( value ){

	if( !value ) return this.Messages.en_one_char;

	var strs = value.split('');

	for( var key  in  strs ){
		if( value &&  strs[key].match(/^[a-zA-Z]+$/) ){
			return true;
		}
	}

	return this.Messages.en_one_char;
};

// 数字が1文字以上記入されているか。
varidateModel.prototype.num_one_char = function( value ){

	if( !value ) return this.Messages.num_one_char;

	var strs = value.split('');

	for( var key  in  strs ){
		if( value &&  strs[key].match(/^[0-9]+$/) ){
			return true;
		}
	}

	return this.Messages.num_one_char;
};

// 設定したinputの内容と一致するかどうか。
varidateModel.prototype.check = function( value ){
	if( $(this.Common.check).val() === value ) return true;
	return this.Messages.check;
};

// クレジットカードの番号確認
varidateModel.prototype.credit = function( value ){
	if(  value && value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13}|(?:2131|1800|35[0-9]{3})[0-9]{11})$/) ){
		return true;
	}
	return this.Messages.credit;
};

varidateModel.prototype.event = function (data){

	var events = {};
	var value = $(data).val();

	if( this.Common.telpost === true ) {
		value = value.replace(/-/g,'');
		$(this.Common.selecter).val( value );
	}

	events.disabled =  this.disabled_check();
	if( this.Common.type === 'select' ) events.select = this.select( $(data).find('option:selected').val() );
	if( this.Common.type === 'radio' ) events.radio = this.radio( $(data).find('input:checked').val() );
	if( this.Common.required && this.Common.type === 'input' ) events.required = this.required( value );
	if( this.Common.kana  ) events.kana = this.kana( value );
	if( this.Common.number  ) events.number = this.number( value );
	if( this.Common.telpost  ) events.telpost = this.telpost( value );
	if( this.Common.mail  ) events.mail = this.mail( value );
	if( this.Common.alphanumeric  ) events.alphanumeric = this.alphanumeric( value );
	if( this.Options.maxlength !== '' ) events.maxlength = this.maxlength( value );
	if( this.Options.minlength !== 0 ) events.minlength = this.minlength( value );
	if( this.Common.check ) events.check = this.check( value );
	if( this.Common.en_one_char ) events.en_one_char = this.en_one_char(value);
	if( this.Common.num_one_char ) events.num_one_char = this.num_one_char(value);
	if( this.Common.credit ) events.credit =  this.credit(value);
	if( this.Common.alphaupper ) events.alphaupper = this.alphaupper(value);

	return events;
};

function varidation( options ){

	var self          = this;
	this.Options      = options;
	this.Models       = [];
	this.fixedSize    = this.Options.fixedSize ? this.Options.fixedSize : 0;
	this.SubmitBefore = this.Options.SubmitBefore ? this.Options.SubmitBefore : function(){ return true; };


	// インスタンスを生成し、配列に格納
	for( var key  in  options.varidateItem ){
		self.Models.push( new varidateModel( options.varidateItem[key] ) );
	}

	this.controller( );
}

varidation.prototype.initialize = function ( events ) {

	var errorList = [];

	for( var key  in  events ){
		if( events[key] === 'disabled' ) return false; // disabledだったら見る必要ないからやめさせます。
		if( events[key] !== true  ) errorList.push( events[key] );
	}

	return $.unique(errorList);
};

varidation.prototype.controller = function(){

	var self = this;

	// サブミットボタンが押された際の処理
	$( self.Options.submitBtn ).click(function(){
		var errorItems = [];

		for( var key  in  self.Models ){
			if( !event(self.Models[key]) ){
				errorItems.push( self.Models[key].Common.selecter );
			}
		}

		if( errorItems.length > 0 ){
			$("html,body").animate({ scrollTop: $( errorItems[0] ).offset().top - self.Options.fixedSize });
			return false;
		}

		self.SubmitBefore();
	});

	for( var key  in  self.Models ){
		switch( self.Models[key].Common.type ){
			case 'select':
				chengeEvent( key );
			break;
			default :
				blurEvent( key );
			break;
		}
	}

	function chengeEvent( key ){
		$( self.Models[key].Common.selecter ).change(function(){
			event( self.Models[key] );
		});
	}

	function blurEvent( key ){
		$( self.Models[key].Common.selecter ).blur(function(){
			event( self.Models[key] );
		});
	}

	function event(Model){
		return self.view(
			Model.Common.selecter,
			self.initialize(
				Model.event( Model.Common.selecter  )
			)
		);
	}

};

varidation.prototype.view = function( id , errorList ){
	var $id = $(id);
	$id.siblings('.error_message').remove();
	$id.after('<div class="error_message"></div>');
	if( errorList.length > 0 ){
		$id.addClass('error');
		$.each( errorList , function( index , item){
			$( id ).siblings('.error_message').append( "<div>※" + item + "</div>" );
		});
		return false;
	}else{
		$id.removeClass('error');
		$id.siblings('.error_message').html('');
		return true;
	}
};
