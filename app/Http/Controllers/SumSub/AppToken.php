<?php


namespace App\Http\Controllers\SumSub;


use App\Http\Controllers\Controller;
use GuzzleHttp;
use GuzzleHttp\Psr7\MultipartStream;

class AppToken extends Controller
{

    public function createApplicant($externalUserId)
        // https://developers.sumsub.com/api-reference/#creating-an-applicant
    {
        $requestBody = [
            'externalUserId' => $externalUserId
        ];

        $url = '/resources/applicants?levelName=basic-kyc-level';
        $request = new GuzzleHttp\Psr7\Request('POST', getenv('SUMSUB_BASE_URL') . $url);
        $request = $request->withHeader('Content-Type', 'application/json');
        $request = $request->withBody(GuzzleHttp\Psr7\Utils::streamFor(json_encode($requestBody)));

        $responseBody = $this->sendHttpRequest($request, $url)->getBody();
        return json_decode($responseBody)->{'id'};
    }


    public function sendHttpRequest($request, $url)
    {
        $client = new GuzzleHttp\Client();
        $ts = time();

        $request = $request->withHeader('X-App-Token', getenv('SUMSUB_TOKEN'));
        $request = $request->withHeader('X-App-Access-Sig', $this->createSignature($ts, $request->getMethod(), $url, $request->getBody()));
        $request = $request->withHeader('X-App-Access-Ts', $ts);

        // Reset stream offset to read body in `send` method from the start
        $request->getBody()->rewind();

        try {
            $response = $client->send($request);
            if ($response->getStatusCode() != 200 && $response->getStatusCode() != 201) {
                // https://developers.sumsub.com/api-reference/#errors
                // If an unsuccessful answer is received, please log the value of the "correlationId" parameter.
                // Then perhaps you should throw the exception. (depends on the logic of your code)
            }
        } catch (GuzzleHttp\Exception\GuzzleException $e) {
            error_log($e);
        }

        return $response;
    }

    private function createSignature($ts, $httpMethod, $url, $httpBody)
    {
        return hash_hmac('sha256', $ts . strtoupper($httpMethod) . $url . $httpBody, getenv('SUMSUB_KEY'));
    }

    public function addDocument($applicantId)
        // https://developers.sumsub.com/api-reference/#adding-an-id-document
    {
        $metadata = ['idDocType' => 'PASSPORT', 'country' => 'GBR'];
        $file = __DIR__ . '/resources/images/sumsub-logo.png';

        $multipart = new MultipartStream([
            [
                "name" => "metadata",
                "contents" => json_encode($metadata)
            ],
            [
                'name' => 'content',
                'contents' => fopen($file, 'r')
            ],
        ]);

        $url = "/resources/applicants/" . $applicantId . "/info/idDoc";
        $request = new GuzzleHttp\Psr7\Request('POST', getenv('SUMSUB_BASE_URL') . $url);
        $request = $request->withBody($multipart);

        return $this->sendHttpRequest($request, $url)->getHeader("X-Image-Id")[0];
    }

    public function getApplicantStatus($applicantId)
        // https://developers.sumsub.com/api-reference/#getting-applicant-status-api
    {
        $url = "/resources/applicants/" . $applicantId . "/requiredIdDocsStatus";
        $request = new GuzzleHttp\Psr7\Request('GET', getenv('SUMSUB_BASE_URL') . $url);

        return $this->sendHttpRequest($request, $url);
        return json_decode($response->getBody());
    }

    public function getAccessToken($externalUserId = null)
        // https://developers.sumsub.com/api-reference/#access-tokens-for-sdks
    {
//        if(!$externalUserId){
//            $externalUserId = uniqid();
//        }
        $url = "/resources/accessTokens?userId=" . $externalUserId;
        $request = new GuzzleHttp\Psr7\Request('POST', getenv('SUMSUB_BASE_URL') . $url);

        return $this->sendHttpRequest($request, $url)->getBody();
    }


}
