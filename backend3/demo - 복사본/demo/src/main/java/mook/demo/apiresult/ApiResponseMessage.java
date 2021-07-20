package mook.demo.apiresult;

import lombok.*;

@Setter @Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ApiResponseMessage {
    private String status;
    private String message;
    private String errorMessage;
    private String errorCode;
}
