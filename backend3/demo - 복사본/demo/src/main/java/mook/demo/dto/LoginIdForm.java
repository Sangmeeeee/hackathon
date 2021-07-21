package mook.demo.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class LoginIdForm {

    @NotEmpty
    private String loginId;
}
