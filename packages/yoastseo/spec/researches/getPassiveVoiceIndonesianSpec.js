import passiveVoice from "../../src/researches/getPassiveVoice.js";
import Paper from "../../src/values/Paper.js";

describe( "detecting passive voice in sentences", function() {
	it( "returns active voice", function() {
		const paper = new Paper( "Seseorang melempar pemumpang itu ke luar.", { locale: "id_ID" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "returns active voice", function() {
		const paper = new Paper( "Anwar sudah mendengar berita itu kemarin", { locale: "id_ID" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "returns passive voice", function() {
		// Passive: dilempar.
		const paper = new Paper( "Penumpang itu dilempar ke luar.", { locale: "id_ID" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "returns passive voice, does not break if the passive verb form is the first word in the sentence", function() {
		// Passive: ditinggal.
		const paper = new Paper( "Ditinggal ibu dan ayahnya sejak kecil, ia tinggal sebatang kara.", { locale: "id_ID" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "returns passive voice", function() {
		// Passive: didengar.
		const paper = new Paper( "Berita itu sudah didengar oleh Anwar kemarin.", { locale: "id_ID" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "returns passive voice", function() {
		// Passive: dilempar.
		const paper = new Paper( "Penumpang itu dilempar ke luar.", { locale: "id_ID" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does not return passive voice if the passive verb is preceded by 'untuk", function() {
		// Passive: digunakan.
		const paper = new Paper( "Kalimat itu lebih baik untuk digunakan", { locale: "id_ID" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "does not return passive voice if the word is found in the non-passive exception list", function() {
		// Non passive: dinosaurus.
		const paper = new Paper( "Saya melihat dinosaurus", { locale: "id_ID" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );
} );
