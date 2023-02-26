<template>
	<div class="container-fluid">
		<vue3-simple-html2pdf v-show="submitted" ref="vue3SimpleHtml2pdf" :options="pdfOptions" :filename="exportFilename">
			<div class="container border my-3 px-5 py-3">
				<div v-if="submitted" class="row justify-content-center">
					<div class="col-9">
						<div class="row mb-2">
							<div class="col d-flex justify-content-left">
								Country:&nbsp;&nbsp;
								<span>
									{{ countryCode }}
								</span>
							</div>
						</div>
						<div class="row mb-2">
							<div class="col d-flex justify-content-left">
								DSP:&nbsp;
								<span>
									{{ dspCode }}
								</span>
							</div>
						</div>
						<div class="row mb-2">
							<div class="col d-flex justify-content-left">
								Station:&nbsp;<span>
									{{ stationCode }}
								</span>
							</div>
						</div>
						<div class="row mb-2">
							<div class="col d-flex justify-content-left">
								License Plate:&nbsp;
								<span>
									{{ licensePlate }}
								</span>
							</div>
						</div>
						<div class="row mb-2">
							<div class="col d-flex justify-content-left">
								VIN Code:&nbsp;<span>
									{{ vinCode }}
								</span>
							</div>
						</div>
					</div>
					<div class="col-3">
						<QRCodeVue3
							:value="vinCode"
							:height="150"
							:width="150"
							class="qrcode"
							fileExt="png"
							download-button="hidden"
							:downloadOptions="{ name: 'vqr', extension: 'png' }"
							:qrOptions="{ typeNumber: '0', mode: 'Byte', errorCorrectionLevel: 'Q' }"
							:imageOptions="{ hideBackgroundDots: true, imageSize: 1, margin: 0 }"
							:dotsOptions="{ type: 'square', color: '#000000	' }"
							:cornersSquareOptions="{ type: 'square', color: '#000000' }"
						/>
					</div>
				</div>
				<div class="row justify-content-center">
					<div class="col">
						<svg id="code128"></svg>
					</div>
				</div>
			</div>
		</vue3-simple-html2pdf>
		<div v-if="submitted" class="row justify-content-center">
			<div class="col-lg-4 col-md-6 col-12">
				<button @click="exportPdf()">export</button>
			</div>
		</div>
		<div v-if="!submitted" class="row justify-content-center">
			<div class="col-lg-4 col-md-6 col-12">
				<div class="row mt-5">
					<div class="col">
						<span> TITLE </span>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<label style="text-align: left"> Country Code: </label>
						<input v-model="countryCode" type="text" maxlength="2" />
					</div>
				</div>
				<div class="row">
					<div class="col">
						<label style="text-align: left"> DSP Code: </label>
						<input v-model="dspCode" type="text" maxlength="4" />
					</div>
				</div>
				<div class="row">
					<div class="col">
						<label style="text-align: left"> Station Code: </label>
						<input v-model="stationCode" type="text" maxlength="4" />
					</div>
				</div>
				<div class="row">
					<div class="col">
						<label style="text-align: left"> License Plate: </label>
						<input v-model="licensePlate" type="text" />
					</div>
				</div>
				<div class="row">
					<div class="col">
						<label style="text-align: left"> VIN Code: </label>
						<input v-model="vinCode" type="text" maxlength="17" />
					</div>
				</div>
			</div>
		</div>
		<div v-if="!submitted" class="row justify-content-center">
			<div class="col-lg-4 col-md-6 col-12">
				<button @click="handleSubmit()">Submit</button>
			</div>
		</div>
	</div>
</template>

<script>
	import QRCodeVue3 from "qrcode-vue3";
	export default {
		components: {
			QRCodeVue3,
		},
		data() {
			return {
				countryCode: "DE",
				dspCode: "DSHP",
				stationCode: "DBE2",
				licensePlate: "",
				vinCode: "",
				submitted: false,

				qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=",

				pdfOptions: {
					margin: 1,
					image: {
						type: "jpeg",
						quality: 1,
					},
					html2canvas: { scale: 3 },
					jsPDF: {
						unit: "mm",
						format: "a4",
						orientation: "p",
					},
				},
				// exportFilename: this.licensePlate + ".pdf",
			};
		},
		computed() {
			//
		},
		methods: {
			async handleSubmit() {
				this.submitted = true;
				JsBarcode("#code128", this.licensePlate);
				this.qrCodeUrl = this.qrCodeUrl + this.vinCode;
			},
			exportPdf() {
				// window.print();
				//
				// var qrcode = new QRCode("qr_code", {
				// 	text: "https://cravecookie.com/",
				// 	width: 128,
				// 	height: 128,
				// 	colorDark: "#000000",
				// 	colorLight: "#ffffff",
				// 	correctLevel: QRCode.CorrectLevel.H,
				// });

				// var pdf = new jsPDF({
				// 	orientation: "landscape",
				// 	unit: "mm",
				// 	format: [84, 41],
				// });

				// pdf.setFontSize(15);
				// pdf.text("Crave Cookie", 43, 20);

				// pdf.setFontSize(10);
				// pdf.text("Scan For Menu", 43, 25);

				// let base64Image = $("#qr_code img").attr("src");

				// pdf.addImage(base64Image, "png", 0, 0, 40, 40);

				this.$refs.vue3SimpleHtml2pdf.download();
				this.exportFilename= this.licensePlate + "pdf";
			},
		},
	};
</script>

<style lang="scss" scoped>
	.qrcode {
		// height: 150px;
		// width: 150px;
	}
</style>
